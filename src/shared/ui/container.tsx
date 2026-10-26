import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

/** Khung nội dung 1280px, lề 32px (16px trên màn nhỏ) theo design. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-8", className)} {...props} />;
}
