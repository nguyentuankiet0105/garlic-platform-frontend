import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import type { ViewerKind } from "@/shared/types/viewer";
import { Overline } from "@/shared/ui";
import { CATEGORY_LABEL, packSummary, type Product } from "../types";
import { PriceGate } from "./price-gate";
import { ProductImage } from "./product-image";
import { StockBadge } from "./stock-badge";

export function ProductCard({
  product,
  viewer,
  showMeta = false,
}: {
  product: Product;
  viewer: ViewerKind;
  /** Trang danh sách: hiện thêm tình trạng kho + đánh giá. */
  showMeta?: boolean;
}) {
  const { rating } = product;
  return (
    <article className="border-border bg-card flex flex-col overflow-hidden rounded-(--radius-card) border">
      <Link
        href={ROUTES.storefront.product(product.slug)}
        className="text-foreground focus-visible:ring-ring flex flex-col no-underline focus-visible:ring-2 focus-visible:ring-inset"
      >
        <ProductImage name={product.name} />
        <div className="flex flex-col gap-1.5 px-[18px] pt-4">
          <div className="flex items-center justify-between gap-2">
            <Overline className="text-xs tracking-[0.08em]">{CATEGORY_LABEL[product.category]}</Overline>
            {showMeta && <StockBadge stock={product.stock} />}
          </div>
          <h3 className="text-lg leading-[26px] font-semibold">{product.name}</h3>
          <span className="text-muted-foreground text-sm leading-5">{packSummary(product)}</span>
          {showMeta && (
            <span className="text-muted-foreground text-[13px]">
              {rating ? `★ ${rating.average} · ${rating.count} đánh giá` : "Chưa có đánh giá"}
            </span>
          )}
        </div>
      </Link>
      <div className="mt-auto px-[18px] pt-3 pb-[18px]">
        <PriceGate product={product} viewer={viewer} />
      </div>
    </article>
  );
}
