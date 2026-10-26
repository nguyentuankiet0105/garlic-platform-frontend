import type { AccountStatus, Role, Session, SessionTier } from "../types";

const ROLES: Role[] = ["ADMIN", "STAFF", "AGENT"];
const TIERS: SessionTier[] = ["T1", "T2", "T3"];

function base64UrlDecode(input: string): string {
  const b64 = input
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(input.length / 4) * 4, "=");
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/**
 * Giải mã payload JWT để phục vụ ĐIỀU HƯỚNG UI (guard layout, proxy.ts) — KHÔNG xác thực chữ ký.
 * Quyền thật sự luôn do backend kiểm tra trên từng request. Chạy được cả ở Edge runtime (proxy).
 */
export function decodeSession(token: string | undefined): Session | null {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const p = JSON.parse(base64UrlDecode(payload)) as Record<string, unknown>;
    const role = p.role as Role;
    if (!ROLES.includes(role) || typeof p.sub !== "string" || typeof p.exp !== "number") return null;
    if (p.exp * 1000 < Date.now()) return null;
    return {
      userId: p.sub,
      email: typeof p.email === "string" ? p.email : "",
      role,
      // Auth service hiện chưa phát claim `status` → mặc định ACTIVE (xem README, mục "Việc cần backend")
      status: (p.status as AccountStatus | undefined) ?? "ACTIVE",
      // TODO: xác nhận với Auth service tên claim cấp đại lý (`tier`); thiếu claim → undefined
      tier: TIERS.includes(p.tier as SessionTier) ? (p.tier as SessionTier) : undefined,
      expiresAt: p.exp,
    };
  } catch {
    return null;
  }
}
