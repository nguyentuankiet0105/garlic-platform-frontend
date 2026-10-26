import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlert, CircleCheck, Info, type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

// Nền các tông này là màu sáng cố định → chữ luôn tối (không theo --foreground) để đạt 4.5:1 cả ở dark mode.
const alertVariants = cva("flex gap-3 rounded-[10px] border p-3.5 text-sm leading-5 text-[#1e2620]", {
  variants: {
    tone: {
      danger: "bg-danger-50 border-danger-border",
      warning: "bg-warning-50 border-warning-border",
      info: "bg-info-50 border-info-600/25",
      success: "bg-success-50 border-brand-200",
    },
  },
  defaultVariants: { tone: "info" },
});

const ICON: Record<NonNullable<VariantProps<typeof alertVariants>["tone"]>, { icon: LucideIcon; color: string }> = {
  danger: { icon: CircleAlert, color: "text-danger-600" },
  warning: { icon: CircleAlert, color: "text-warning-600" },
  info: { icon: Info, color: "text-info-600" },
  success: { icon: CircleCheck, color: "text-success-600" },
};

export function Alert({
  tone = "info",
  title,
  icon,
  children,
  className,
  role,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "title"> &
  VariantProps<typeof alertVariants> & { title?: ReactNode; icon?: LucideIcon }) {
  const t = tone ?? "info";
  const Icon = icon ?? ICON[t].icon;
  return (
    <div role={role ?? (t === "danger" ? "alert" : "status")} className={cn(alertVariants({ tone }), className)} {...props}>
      <Icon className={cn("mt-px size-[18px] shrink-0", ICON[t].color)} aria-hidden />
      <div className="grid gap-0.5">
        {title && <p className={cn("font-semibold", ICON[t].color)}>{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
