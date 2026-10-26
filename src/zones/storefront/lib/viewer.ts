import "server-only";
import type { AgentTier } from "@/features/agents";
import { getSession } from "@/features/auth/server";
import type { ViewerKind } from "@/shared/types/viewer";

export interface Viewer {
  kind: ViewerKind;
  /** Chỉ có khi kind === "agent". Dùng để xin giá đúng cấp từ catalog. */
  tier?: AgentTier;
  displayName?: string;
}

/**
 * Xác định người xem storefront từ session (cookie httpOnly).
 *  - AGENT + ACTIVE            → agent (thấy giá theo cấp)
 *  - AGENT + PENDING           → pending (không giá)
 *  - còn lại (chưa đăng nhập, admin/staff, bị khoá/từ chối) → guest (không giá)
 */
export async function getViewer(): Promise<Viewer> {
  const s = await getSession();
  if (s?.role === "AGENT") {
    if (s.status === "ACTIVE") return { kind: "agent", tier: s.tier ?? "T1", displayName: s.email };
    if (s.status === "PENDING") return { kind: "pending", displayName: s.email };
  }
  return { kind: "guest" };
}
