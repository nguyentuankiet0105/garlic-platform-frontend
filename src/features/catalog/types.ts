export type ProductCategory = "fresh" | "dried" | "processed" | "black";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  origin: string;
  /** Giá niêm yết / kg. Giá sỉ theo cấp đại lý do Agent service quyết định. */
  listPricePerKg: number;
  minOrderKg: number;
  stockKg: number;
  summary: string;
  description: string;
  tags: string[];
}

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  fresh: "Tỏi tươi",
  dried: "Tỏi khô",
  processed: "Tỏi chế biến",
  black: "Tỏi đen",
};
