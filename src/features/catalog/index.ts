export { AddToCart } from "./components/add-to-cart";
export { PriceGate } from "./components/price-gate";
export { ProductCard } from "./components/product-card";
export { ProductFilters, ProductSortSelect } from "./components/product-filters";
export { ProductImage } from "./components/product-image";
export { PurchasePanel } from "./components/purchase-panel";
export { StockBadge } from "./components/stock-badge";
export { useProducts, catalogKeys } from "./hooks/use-products";
export { createCatalogApi } from "./api/catalog.api";
export type { ProductQuery } from "./api/catalog.api";
export { clampQty } from "./lib/pricing";
export {
  CATEGORY_DESC,
  CATEGORY_LABEL,
  ORIGIN_LABEL,
  PACK_UNITS,
  SORT_LABEL,
  STOCK_LABEL,
  packSummary,
} from "./types";
export type {
  PackUnit,
  Product,
  ProductCategory,
  ProductOrigin,
  ProductPrice,
  ProductSort,
  RatingSummary,
  StockStatus,
} from "./types";
