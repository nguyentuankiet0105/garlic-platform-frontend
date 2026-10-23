import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { formatVnd } from "@/shared/lib/format";
import { Badge } from "@/shared/ui";
import { CATEGORY_LABEL, type Product } from "../types";
import { ProductVisual } from "./product-visual";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={ROUTES.storefront.product(product.slug)}
      className="group border-border bg-card overflow-hidden rounded-(--radius-card) border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <ProductVisual
        category={product.category}
        className="transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="grid gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <Badge tone="brand">{CATEGORY_LABEL[product.category]}</Badge>
          <span className="text-muted-foreground text-xs">{product.origin}</span>
        </div>
        <h3 className="font-semibold tracking-tight">{product.name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">{product.summary}</p>
        <div className="mt-1 flex items-end justify-between">
          <div>
            <p className="text-muted-foreground text-xs">Giá niêm yết</p>
            <p className="text-primary text-lg font-semibold">
              {formatVnd(product.listPricePerKg)}
              <span className="text-muted-foreground text-xs font-normal">/kg</span>
            </p>
          </div>
          <span className="text-muted-foreground text-xs">Tối thiểu {product.minOrderKg}kg</span>
        </div>
      </div>
    </Link>
  );
}
