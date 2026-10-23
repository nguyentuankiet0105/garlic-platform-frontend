export type PostKind = "guide" | "review";

export interface Post {
  id: string;
  slug: string;
  kind: PostKind;
  title: string;
  excerpt: string;
  /** Tham chiếu mềm tới product (không FK chéo service). */
  productSlug?: string;
  readingMinutes: number;
  publishedAt: string;
  author: string;
  /** Review từ đơn đã giao → hiện nhãn "Đã mua hàng". */
  verifiedPurchase?: boolean;
}
