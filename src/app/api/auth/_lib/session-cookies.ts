import { cookies } from "next/headers";
import { decodeSession } from "@/features/auth/lib/jwt";
import { homeFor } from "@/features/auth/server";
import type { LoginResponse } from "@/features/auth/types";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/shared/config/cookies";
import { ROUTES } from "@/shared/config/routes";

export const ACCESS_TTL = 15 * 60; // khớp JWT_EXPIRES_IN=15m của Auth service
export const REFRESH_TTL = 7 * 24 * 60 * 60;

const cookieBase = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" } as const;

/**
 * Đặt token vào cookie httpOnly — browser không bao giờ thấy token.
 * remember=false → refresh cookie không có maxAge (cookie phiên, mất khi đóng trình duyệt).
 */
export async function setSessionCookies(tokens: LoginResponse, remember = true) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, tokens.accessToken, { ...cookieBase, path: "/", maxAge: ACCESS_TTL });
  // Refresh token chỉ gửi tới nhóm route /api/auth — thu hẹp bề mặt lộ token
  jar.set(REFRESH_COOKIE, tokens.refreshToken, {
    ...cookieBase,
    path: "/api/auth",
    ...(remember ? { maxAge: REFRESH_TTL } : {}),
  });
}

/** Đại lý chưa ACTIVE (chờ duyệt / bị từ chối) luôn về trang chờ duyệt. */
export function landingFor(accessToken: string): string | null {
  const session = decodeSession(accessToken);
  if (!session) return null;
  return session.role === "AGENT" && session.status !== "ACTIVE" ? ROUTES.pendingApproval : homeFor(session.role);
}
