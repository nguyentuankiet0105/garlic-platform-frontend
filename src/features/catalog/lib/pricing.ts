import type { Product } from "../types";

/** Làm tròn số lượng về bội số hợp lệ (≥ tối thiểu). */
export function clampQty(p: Pick<Product, "minPacks" | "packStep">, qty: number): number {
  const step = Math.max(1, p.packStep);
  const snapped = Math.round(qty / step) * step;
  return Math.max(p.minPacks, snapped);
}
