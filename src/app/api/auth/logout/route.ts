import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/shared/config/env";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/shared/config/cookies";

export async function POST() {
  const jar = await cookies();
  const refreshToken = jar.get(REFRESH_COOKIE)?.value;

  // Best-effort: thu hồi refresh token ở backend; lỗi mạng không được chặn việc đăng xuất.
  if (!env.USE_MOCKS && refreshToken) {
    await fetch(`${env.services.auth}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => undefined);
  }

  jar.delete(ACCESS_COOKIE);
  jar.delete({ name: REFRESH_COOKIE, path: "/api/auth" });
  return NextResponse.json({ ok: true });
}
