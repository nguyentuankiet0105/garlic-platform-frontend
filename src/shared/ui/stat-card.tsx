import type { LucideIcon } from "lucide-react";
import { Card } from "./card";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="flex items-start justify-between gap-4 p-5">
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
        {hint && <p className="text-muted-foreground mt-1 text-xs">{hint}</p>}
      </div>
      <span className="bg-primary-soft text-primary-soft-foreground grid size-10 place-items-center rounded-xl">
        <Icon className="size-5" />
      </span>
    </Card>
  );
}
