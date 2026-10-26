import Link from "next/link";
import { SITE } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";
import { GarlicIcon } from "./garlic-icon";

/** Logo tạm theo design: ô xanh bo 10px + củ tỏi + tên (Lora). Thay bằng SVG thật khi có brand. */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — Trang chủ`}
      className={cn("inline-flex items-center gap-2.5 no-underline", className)}
    >
      <span className="bg-brand-700 text-brand-50 grid size-10 place-items-center rounded-[10px]">
        <GarlicIcon />
      </span>
      <span className={cn("font-display text-2xl leading-7 font-semibold", inverted ? "text-white" : "text-foreground")}>
        {SITE.name}
      </span>
    </Link>
  );
}
