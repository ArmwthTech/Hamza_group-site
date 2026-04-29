import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { seedCars } from "@/lib/sample-data";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import type { Car } from "@/types";

function unauthorized() {
  return NextResponse.json({ ok: false, message: "Требуется вход в админку." }, { status: 401 });
}

function normalizeCarPayload(car: Partial<Car>) {
  const imageUrls = Array.isArray(car.image_urls)
    ? car.image_urls.filter((url): url is string => Boolean(url?.trim()))
    : [];
  const imageUrl = imageUrls[0] || car.image_url || "/images/hamza-brand-board.png";

  return {
    title: car.title,
    country: car.country,
    year: Number(car.year),
    price_from: Number(car.price_from),
    image_url: imageUrl,
    image_urls: imageUrls,
    description: car.description,
    mileage: car.mileage || null,
    engine: car.engine || null,
    status: car.status || "draft"
  };
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "demo", cars: seedCars });
  }

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, message: "Не удалось загрузить каталог." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, mode: "supabase", cars: data || [] });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, message: "Supabase не настроен." }, { status: 503 });
  }

  const payload = normalizeCarPayload((await request.json()) as Partial<Car>);
  const { error } = await supabase.from("cars").insert(payload);

  if (error) {
    return NextResponse.json({ ok: false, message: "Не удалось сохранить авто." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, message: "Supabase не настроен." }, { status: 503 });
  }

  const body = (await request.json()) as Partial<Car>;
  if (!body.id) {
    return NextResponse.json({ ok: false, message: "Не указан id авто." }, { status: 400 });
  }

  const payload = normalizeCarPayload(body);
  const { error } = await supabase.from("cars").update(payload).eq("id", body.id);

  if (error) {
    return NextResponse.json({ ok: false, message: "Не удалось обновить авто." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, message: "Supabase не настроен." }, { status: 503 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, message: "Не указан id авто." }, { status: 400 });
  }

  const { error } = await supabase.from("cars").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, message: "Не удалось удалить авто." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
