import { Badge } from "@/shared/ui";
import { STOCK_LABEL, type StockStatus } from "../types";

const TONE = { in: "brand", low: "warning", out: "neutral" } as const;

export function StockBadge({ stock }: { stock: StockStatus }) {
  return <Badge tone={TONE[stock]}>{STOCK_LABEL[stock]}</Badge>;
}
