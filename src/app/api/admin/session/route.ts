import { NextRequest, NextResponse } from "next/server";
import { isAdminPasswordConfigured, isAdminRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    passwordConfigured: isAdminPasswordConfigured(),
    authenticated: isAdminRequest(request)
  });
}
