import type { AgentTier } from "@/features/agents";

export type ProductCategory = "lyson" | "codon" | "kho" | "phi";
export type ProductOrigin = "ly-son" | "phan-rang";
/** Đơn vị bán sỉ: theo bao hoặc thùng (không bán lẻ theo kg). */
export type PackUnit = "bao" | "thùng";
export type StockStatus = "in" | "low" | "out";
export type ProductSort = "popular" | "newest" | "name";

/** Giá của 1 đơn vị bán theo cấp của người xem. CHỈ có khi người xem là đại lý đã duyệt (server quyết định). */
export interface ProductPrice {
  tier: AgentTier;
  perPack: number;
}

export interface RatingSummary {
  average: number;
  count: number;
  /** Số lượt đánh giá theo [5★, 4★, 3★, 2★, 1★]. */
  distribution: [number, number, number, number, number];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  origin: ProductOrigin;
  /** "Bao 10kg", "Thùng 12 hũ"… — quy cách một đơn vị bán. */
  packLabel: string;
  packUnit: PackUnit;
  /** Số đơn vị tối thiểu mỗi đơn, và bội số (vd. min 2, step 2). */
  minPacks: number;
  packStep: number;
  stock: StockStatus;
  /** null = chưa có đánh giá. */
  rating: RatingSummary | null;
  summary: string;
  description: string;
  storage: string;
  /** ISO date — dùng cho sắp xếp "Mới nhất". */
  createdAt: string;
  /** Giá theo cấp. Với khách/đại lý chờ duyệt luôn là undefined: backend (hoặc mock) không trả. */
  price?: ProductPrice;
}

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  lyson: "Tỏi Lý Sơn",
  codon: "Tỏi cô đơn",
  kho: "Tỏi khô",
  phi: "Tỏi phi & chế biến",
};

export const CATEGORY_DESC: Record<ProductCategory, string> = {
  lyson: "Tép nhỏ, thơm cay đặc trưng",
  codon: "Một tép, hàng tuyển",
  kho: "Phơi khô, bảo quản lâu",
  phi: "Tỏi phi, tỏi bóc vỏ",
};

export const ORIGIN_LABEL: Record<ProductOrigin, string> = {
  "ly-son": "Lý Sơn, Quảng Ngãi",
  "phan-rang": "Phan Rang, Ninh Thuận",
};

export const STOCK_LABEL: Record<StockStatus, string> = {
  in: "Còn hàng",
  low: "Sắp hết",
  out: "Hết hàng",
};

export const SORT_LABEL: Record<ProductSort, string> = {
  popular: "Phổ biến",
  newest: "Mới nhất",
  name: "Tên A–Z",
};

export const PACK_UNITS: PackUnit[] = ["bao", "thùng"];

/** "Bao 10kg · tối thiểu 2 bao" */
export const packSummary = (p: Pick<Product, "packLabel" | "minPacks" | "packUnit">) =>
  `${p.packLabel} · tối thiểu ${p.minPacks} ${p.packUnit}`;
