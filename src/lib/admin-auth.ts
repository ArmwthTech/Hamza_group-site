import { createHash, timingSafeEqual } from "crypto";
import type { NextRequest, NextResponse } from "next/server";

export const adminCookieName = "hamza_admin_session";

export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function getAdminSessionValue() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return "";
  return createHash("sha256").update(`hamza-admin:${password}`).digest("hex");
}

export function isValidAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return false;

  const received = Buffer.from(password);
  const expected = Buffer.from(configuredPassword);

  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function isAdminRequest(request: NextRequest) {
  const session = request.cookies.get(adminCookieName)?.value;
  const expected = getAdminSessionValue();
  return Boolean(session && expected && session === expected);
}

export function setAdminCookie(response: NextResponse) {
  response.cookies.set(adminCookieName, getAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(adminCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
}
