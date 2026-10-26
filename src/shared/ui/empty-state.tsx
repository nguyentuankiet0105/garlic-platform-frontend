import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * Trạng thái màn hình dữ liệu (design system §05): cùng một khung — biểu tượng, tiêu đề, một câu giải thích, một hành động.
 * `tone`: empty (viền đứt) · error (viền đỏ) · forbidden (không có quyền).
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  tone = "empty",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "empty" | "error" | "forbidden";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-card grid justify-items-center gap-2.5 rounded-(--radius-card) border p-8 text-center",
        tone === "empty" && "border-border-strong border-dashed",
        tone === "error" && "border-danger-border",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-14 place-items-center rounded-full",
          tone === "empty" && "bg-muted text-muted-foreground",
          tone === "error" && "bg-danger-50 text-danger-600",
          tone === "forbidden" && "bg-accent-soft text-garlic-600",
        )}
      >
        <Icon className="size-[26px]" aria-hidden />
      </span>
      <p className="text-lg leading-[26px] font-semibold">{title}</p>
      {description && <p className="text-muted-foreground max-w-md text-sm leading-5">{description}</p>}
      {action && <div className="mt-1.5">{action}</div>}
    </div>
  );
}
