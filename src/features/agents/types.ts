export type AgentTier = "T1" | "T2" | "T3";

export interface AgentProfile {
  id: string;
  businessName: string;
  tier: AgentTier;
  creditLimit: number;
  outstandingDebt: number;
}

export const TIER_LABEL: Record<AgentTier, string> = {
  T1: "Cấp 1 — Đại lý mới",
  T2: "Cấp 2 — Đại lý",
  T3: "Cấp 3 — Đại lý chiến lược",
};
