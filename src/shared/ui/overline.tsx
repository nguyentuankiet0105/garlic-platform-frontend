import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

/** Dòng nhãn nhỏ chữ hoa màu đất nung phía trên tiêu đề (caption/overline của design system). */
export function Overline({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-garlic-500 dark:text-garlic-300 text-xs font-bold tracking-[0.1em] uppercase", className)}
      {...props}
    />
  );
}
