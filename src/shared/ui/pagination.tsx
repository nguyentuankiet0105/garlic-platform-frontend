import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";

/**
 * Phân trang bằng link (SEO + không cần JS). Trả null khi chỉ có 1 trang.
 * `hrefFor(page)` do trang gọi dựng — giữ nguyên các bộ lọc trong URL.
 */
export function Pagination({
  page,
  totalPages,
  hrefFor,
}: {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}) {
  if (totalPages <= 1) return null;
  const item = "grid size-11 place-items-center rounded-[10px] border text-[15px] font-semibold";
  return (
    <nav aria-label="Phân trang" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} aria-label="Trang trước" className={cn(item, "border-border-strong bg-card")}>
          <ChevronLeft className="size-5" aria-hidden />
        </Link>
      ) : null}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={hrefFor(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(item, n === page ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-card")}
        >
          {n}
        </Link>
      ))}
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} aria-label="Trang sau" className={cn(item, "border-border-strong bg-card")}>
          <ChevronRight className="size-5" aria-hidden />
        </Link>
      ) : null}
    </nav>
  );
}
