import { NextResponse } from "next/server";
import {
  isAdminPasswordConfigured,
  isValidAdminPassword,
  setAdminCookie
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { ok: false, message: "ADMIN_PASSWORD не настроен." },
      { status: 503 }
    );
  }

  const { password } = (await request.json().catch(() => ({ password: "" }))) as {
    password?: string;
  };

  if (!password || !isValidAdminPassword(password)) {
    return NextResponse.json({ ok: false, message: "Неверный пароль." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  setAdminCookie(response);
  return response;
}
