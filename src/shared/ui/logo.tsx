import Link from "next/link";
import { SITE } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";

/** Logo tạm: huy hiệu teal + chữ. Thay bằng SVG thật khi có brand. */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight", className)}>
      <span className="from-brand-400 to-brand-700 grid size-9 place-items-center rounded-xl bg-linear-to-br text-lg shadow-sm">
        <span aria-hidden>🧄</span>
      </span>
      <span className={cn("text-lg", inverted ? "text-white" : "text-foreground")}>{SITE.name}</span>
    </Link>
  );
}
