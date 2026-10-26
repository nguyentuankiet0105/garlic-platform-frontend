import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * Kích thước theo design system: sm 36 · md 44 · lg 52px (vùng chạm tối thiểu 44px ở md/lg).
 * Biến thể bám shadcn/ui: primary · soft(secondary) · outline · ghost · danger; thêm accent và inverse (trên nền xanh).
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:bg-border disabled:text-muted-foreground",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        soft: "bg-primary-soft text-primary-soft-foreground hover:bg-brand-200 dark:hover:bg-brand-400/25",
        accent: "bg-accent text-accent-foreground hover:bg-garlic-600",
        outline: "border border-border-strong bg-card text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        danger: "bg-danger-600 text-white hover:bg-red-800",
        inverse: "bg-background text-brand-800 hover:bg-white",
      },
      size: {
        sm: "h-9 rounded-lg px-3.5 text-sm",
        md: "h-11 rounded-[10px] px-5 text-[15px]",
        lg: "h-[52px] rounded-xl px-7 text-base",
        icon: "size-11 rounded-[10px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ className, variant, size, ...props }: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
