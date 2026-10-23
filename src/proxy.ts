import { NextResponse, type NextRequest } from "next/server";
import { decodeSession } from "@/features/auth/lib/jwt";
import { ROUTES, ZONE_PREFIX } from "@/shared/config/routes";
import { ACCESS_COOKIE } from "@/shared/config/cookies";

/**
 * Lớp bảo vệ ĐẦU TIÊN (chạy trước khi render): chặn nhanh người chưa đăng nhập / sai role vào zone kín.
 * Chỉ giải mã payload, không verify chữ ký → coi là UX guard. Guard thật: layout (requireRole) + backend.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = decodeSession(req.cookies.get(ACCESS_COOKIE)?.value);

  const toLogin = () => {
    const url = new URL(ROUTES.login, req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  };

  if (pathname.startsWith(ZONE_PREFIX.agent)) {
    if (!session) return toLogin();
    if (session.role !== "AGENT") return NextResponse.redirect(new URL(ROUTES.admin.root, req.url));
  }

  if (pathname.startsWith(ZONE_PREFIX.admin)) {
    if (!session) return toLogin();
    if (session.role === "AGENT") return NextResponse.redirect(new URL(ROUTES.agent.root, req.url));
  }

  // Đã đăng nhập mà vào /login → đưa về khu làm việc
  if (pathname === ROUTES.login && session) {
    return NextResponse.redirect(new URL(session.role === "AGENT" ? ROUTES.agent.root : ROUTES.admin.root, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*", "/login"],
};
