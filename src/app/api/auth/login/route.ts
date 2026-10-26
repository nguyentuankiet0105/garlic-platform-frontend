import { NextResponse } from "next/server";
import { decodeSession } from "@/features/auth/lib/jwt";
import { MOCK_ACCOUNTS } from "@/features/auth/lib/mock-accounts";
import { loginSchema } from "@/features/auth/schemas/login.schema";
import { makeMockToken } from "@/features/auth/server/mock-token";
import type { LoginResponse } from "@/features/auth/types";
import { env } from "@/shared/config/env";
import { ACCESS_TTL, landingFor, setSessionCookies } from "../_lib/session-cookies";

/** BFF login: gọi Auth service, đặt token vào cookie httpOnly. Giữ nguyên status 401/403/429 để UI chọn đúng thông báo. */
export async function POST(req: Request) {
  const parsed = loginSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Dữ liệu không hợp lệ" }, { status: 400 });
  const { email, password, remember } = parsed.data;

  let tokens: LoginResponse;

  if (env.USE_MOCKS) {
    const acc = MOCK_ACCOUNTS[email];
    if (acc?.fail === "inactive") return NextResponse.json({ message: "Tài khoản đã bị vô hiệu hoá" }, { status: 403 });
    if (acc?.fail === "throttled") return NextResponse.json({ message: "Quá nhiều lần thử" }, { status: 429 });
    const access = makeMockToken(email, ACCESS_TTL);
    if (!access) {
      return NextResponse.json(
        { message: `Mock: dùng ${Object.keys(MOCK_ACCOUNTS).slice(0, 4).join(" / ")}` },
        { status: 401 },
      );
    }
    tokens = { accessToken: access, refreshToken: "mock-refresh" };
  } else {
    let res: Response;
    try {
      res = await fetch(`${env.services.auth}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      return NextResponse.json({ message: "Không kết nối được máy chủ xác thực" }, { status: 502 });
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = Array.isArray(data?.message) ? data.message.join(", ") : (data?.message ?? "Đăng nhập thất bại");
      return NextResponse.json({ message }, { status: res.status });
    }
    tokens = data as LoginResponse;
  }

  const session = decodeSession(tokens.accessToken);
  const next = landingFor(tokens.accessToken);
  if (!session || !next) return NextResponse.json({ message: "Token không hợp lệ" }, { status: 502 });

  await setSessionCookies(tokens, remember ?? true);
  return NextResponse.json({ session, next });
}
