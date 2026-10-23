import "server-only";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";
import type { Role, Session } from "../types";
import { getSession } from "./session";

/**
 * Guard dùng trong layout của từng zone — lớp bảo vệ THỨ HAI sau proxy.ts
 * (proxy chặn sớm ở edge theo cookie; guard này kiểm role/status chính xác).
 */
export async function requireRole(roles: Role[], loginNext: string): Promise<Session> {
  const session = await getSession();
  if (!session) redirect(`${ROUTES.login}?next=${encodeURIComponent(loginNext)}`);
  if (!roles.includes(session.role)) redirect(ROUTES.home);
  // Đại lý chưa duyệt chỉ được thấy trang chờ duyệt
  if (session.role === "AGENT" && session.status !== "ACTIVE") redirect(ROUTES.pendingApproval);
  return session;
}

/** Đường vào mặc định theo role sau khi đăng nhập. */
export function homeFor(role: Role): string {
  return role === "AGENT" ? ROUTES.agent.root : ROUTES.admin.root;
}
