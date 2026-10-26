import { NextResponse } from "next/server";
import { decodeSession } from "@/features/auth/lib/jwt";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import { signMockToken } from "@/features/auth/server/mock-token";
import { env } from "@/shared/config/env";
import { ROUTES } from "@/shared/config/routes";
import { ACCESS_TTL, setSessionCookies } from "../_lib/session-cookies";

/**
 * BFF đăng ký đại lý.
 *  - Mock: tạo phiên PENDING ngay để xem luồng "Chờ duyệt".
 *  - Thật: CHƯA hỗ trợ. Auth service chỉ có /auth/register (email + mật khẩu); hồ sơ cửa hàng thuộc Agent service
 *    (chưa có) và trạng thái PENDING/duyệt chưa có trong Auth. Trả lỗi rõ ràng thay vì tạo tài khoản thiếu hồ sơ.
 */
export async function POST(req: Request) {
  const parsed = registerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Dữ liệu không hợp lệ" }, { status: 400 });

  if (!env.USE_MOCKS) {
    return NextResponse.json(
      { message: "Đăng ký đại lý chưa kết nối máy chủ. Vui lòng liên hệ bộ phận kinh doanh để được hỗ trợ." },
      { status: 501 },
    );
  }

  const accessToken = signMockToken({ email: parsed.data.email, role: "AGENT", status: "PENDING" }, ACCESS_TTL);
  const session = decodeSession(accessToken);
  await setSessionCookies({ accessToken, refreshToken: "mock-refresh" });
  return NextResponse.json({ session, next: ROUTES.pendingApproval }, { status: 201 });
}
