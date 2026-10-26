export type PostKind = "guide" | "review";

export interface Post {
  id: string;
  slug: string;
  kind: PostKind;
  /** Nhãn chủ đề hiển thị trên thẻ: Bảo quản, Kiến thức, Kinh doanh… */
  tag: string;
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

/**
 * Đánh giá sản phẩm. Chỉ đại lý đã nhận hàng mới viết được (từ trang chi tiết đơn) → luôn là "Đã mua hàng".
 * Công khai KHÔNG có mã đơn / số lượng đặt (đó là dữ liệu kinh doanh của đại lý).
 */
export interface Review {
  id: string;
  productSlug: string;
  productName: string;
  /** Tên đại lý hiển thị công khai. */
  who: string;
  where: string;
  /** ISO date */
  date: string;
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
  hasPhoto: boolean;
}
