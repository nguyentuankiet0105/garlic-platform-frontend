import { Award } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { TIER_NAME, type AgentTier } from "../types";

// Design: chip nền đặc + huy chương, bo 6px, chữ trắng (khác pill trạng thái). Nền đủ tối để chữ trắng đạt AA.
const TIER_STYLE: Record<AgentTier, string> = {
  T1: "bg-tier-bronze",
  T2: "bg-tier-silver",
  T3: "bg-tier-gold",
};

/** Chip cấp đại lý: icon + tên (Đồng/Bạc/Vàng) — không chỉ dựa vào màu. */
export function TierBadge({ tier, className }: { tier: AgentTier; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md py-1 pr-2.5 pl-2 text-xs leading-4 font-bold text-white",
        TIER_STYLE[tier],
        className,
      )}
    >
      <Award className="size-3.5" aria-hidden />
      Cấp {TIER_NAME[tier]}
    </span>
  );
}
