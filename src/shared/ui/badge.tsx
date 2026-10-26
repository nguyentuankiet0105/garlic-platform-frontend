import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * Quy tắc design: trạng thái = pill mềm, bo tròn (component này).
 * Cấp đại lý = chip nền đặc + huy chương, bo 6px → dùng TierBadge trong features/agents.
 */
const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs leading-4 font-semibold", {
  variants: {
    tone: {
      brand: "bg-primary-soft text-primary-soft-foreground",
      garlic: "bg-accent-soft text-garlic-600 dark:text-garlic-300",
      neutral: "bg-muted text-muted-foreground",
      success: "bg-success-50 text-success-600",
      warning: "bg-warning-50 text-warning-600",
      danger: "bg-danger-50 text-danger-600",
      info: "bg-info-50 text-info-600",
    },
  },
  defaultVariants: { tone: "brand" },
});

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
