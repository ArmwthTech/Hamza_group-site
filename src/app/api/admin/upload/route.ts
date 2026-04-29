import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getCarPhotoBucket, getSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, message: "Требуется вход в админку." }, { status: 401 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, message: "Supabase Storage не настроен." }, { status: 503 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((file): file is File => file instanceof File);

  if (!files.length) {
    return NextResponse.json({ ok: false, message: "Файлы не выбраны." }, { status: 400 });
  }

  const bucket = getCarPhotoBucket();
  const urls: string[] = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;

    const extension = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: file.type,
      upsert: false
    });

    if (error) {
      return NextResponse.json({ ok: false, message: "Не удалось загрузить фото." }, { status: 500 });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return NextResponse.json({ ok: true, urls });
}
