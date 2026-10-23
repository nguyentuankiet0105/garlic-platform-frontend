import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginSchema } from "@/features/auth/schemas/login.schema";
import { decodeSession } from "@/features/auth/lib/jwt";
import { homeFor } from "@/features/auth/server";
import { makeMockToken } from "@/features/auth/server/mock-token";
import type { LoginResponse } from "@/features/auth/types";
import { env } from "@/shared/config/env";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/shared/config/cookies";

const ACCESS_TTL = 15 * 60; // khớp JWT_EXPIRES_IN=15m của Auth service
const REFRESH_TTL = 7 * 24 * 60 * 60;

const cookieBase = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" } as const;

/** BFF login: gọi Auth service, đặt token vào cookie httpOnly — browser không bao giờ thấy token. */
export async function POST(req: Request) {
  const parsed = loginSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Dữ liệu không hợp lệ" }, { status: 400 });
  const { email, password } = parsed.data;

  let tokens: LoginResponse | null = null;

  if (env.USE_MOCKS) {
    const access = makeMockToken(email, ACCESS_TTL);
    if (!access) {
      return NextResponse.json(
        { message: "Mock: dùng admin@demo.vn / staff@demo.vn / agent@demo.vn / pending@demo.vn" },
        { status: 401 },
      );
    }
    tokens = { accessToken: access, refreshToken: "mock-refresh" };
  } else {
    const res = await fetch(`${env.services.auth}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = Array.isArray(data?.message) ? data.message.join(", ") : (data?.message ?? "Đăng nhập thất bại");
      return NextResponse.json({ message }, { status: res.status });
    }
    tokens = data as LoginResponse;
  }

  const session = decodeSession(tokens.accessToken);
  if (!session) return NextResponse.json({ message: "Token không hợp lệ" }, { status: 502 });

  const jar = await cookies();
  jar.set(ACCESS_COOKIE, tokens.accessToken, { ...cookieBase, path: "/", maxAge: ACCESS_TTL });
  // Refresh token chỉ gửi tới nhóm route /api/auth — thu hẹp bề mặt lộ token
  jar.set(REFRESH_COOKIE, tokens.refreshToken, { ...cookieBase, path: "/api/auth", maxAge: REFRESH_TTL });

  const next = session.role === "AGENT" && session.status !== "ACTIVE" ? "/pending-approval" : homeFor(session.role);
  return NextResponse.json({ session, next });
}
