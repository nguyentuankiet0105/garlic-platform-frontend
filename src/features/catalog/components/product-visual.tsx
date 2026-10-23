import { cn } from "@/shared/lib/cn";
import type { ProductCategory } from "../types";

const GRADIENT: Record<ProductCategory, string> = {
  fresh: "from-brand-100 via-brand-50 to-garlic-50",
  dried: "from-garlic-100 via-garlic-50 to-brand-50",
  processed: "from-brand-200 via-brand-100 to-garlic-100",
  black: "from-ink-800 via-ink-900 to-brand-950",
};

/** Ảnh sản phẩm tạm (gradient + emoji) cho tới khi có ảnh S3/CloudFront. */
export function ProductVisual({ category, className }: { category: ProductCategory; className?: string }) {
  return (
    <div className={cn("grid aspect-4/3 place-items-center bg-linear-to-br text-6xl", GRADIENT[category], className)}>
      <span aria-hidden className={category === "black" ? "grayscale invert" : ""}>
        🧄
      </span>
    </div>
  );
}
