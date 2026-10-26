import type { Post, Review } from "../types";

export const SEED_POSTS: Post[] = [
  {
    id: "c1",
    slug: "cach-bao-quan-toi-kho-6-thang",
    kind: "guide",
    tag: "Bảo quản",
    title: "Bảo quản tỏi Lý Sơn mùa mưa không bị mọc mầm",
    excerpt: "Độ ẩm, thông gió và bao bì — ba yếu tố đại lý nào cũng cần nắm trước mùa mưa.",
    productSlug: "toi-ly-son-loai-1",
    readingMinutes: 5,
    publishedAt: "2026-10-02",
    author: "Ban kỹ thuật",
  },
  {
    id: "c2",
    slug: "phan-biet-toi-co-don-that",
    kind: "guide",
    tag: "Kiến thức",
    title: "Phân biệt tỏi cô đơn Lý Sơn và tỏi cô đơn nhập khẩu",
    excerpt: "Kích thước củ, mùi và vết cắt: 4 dấu hiệu nhận biết nhanh khi nhập hàng.",
    productSlug: "toi-co-don-ly-son",
    readingMinutes: 4,
    publishedAt: "2026-09-21",
    author: "Ban kỹ thuật",
  },
  {
    id: "c3",
    slug: "trung-bay-toi-tai-tap-hoa",
    kind: "guide",
    tag: "Kinh doanh",
    title: "Trưng bày tỏi tại tạp hoá: giữ hàng khô, bán nhanh hơn",
    excerpt: "Vị trí kệ, cách chia bao nhỏ và mẹo giữ tỏi không hao hụt cho cửa hàng nhỏ.",
    readingMinutes: 3,
    publishedAt: "2026-10-15",
    author: "Phòng kinh doanh",
  },
  {
    id: "c4",
    slug: "review-toi-phi-giong-gion",
    kind: "review",
    tag: "Review",
    title: "Tỏi phi giòn lâu, không ỉu sau 2 tuần mở hũ",
    excerpt: "Đại lý tại Đà Nẵng chia sẻ sau 3 lần nhập liên tiếp cho chuỗi bún mì.",
    productSlug: "toi-phi-vang-hu-500g",
    readingMinutes: 2,
    publishedAt: "2026-10-10",
    author: "Đại lý Hải Châu",
    verifiedPurchase: true,
  },
];

/** Mẫu đánh giá — số lượng ít hơn `rating.count` của sản phẩm (đủ để minh hoạ giao diện). */
export const SEED_REVIEWS: Review[] = [
  {
    id: "r1", productSlug: "toi-ly-son-loai-1", productName: "Tỏi Lý Sơn loại 1", who: "Đại lý Minh Phát", where: "Đà Nẵng",
    date: "2026-10-12", stars: 5, hasPhoto: false,
    text: "Củ đều, khô ráo, bao lưới chắc chắn. Lô này thơm hơn lô tháng trước. Đặt lại đơn trên điện thoại chỉ mất một phút.",
  },
  {
    id: "r2", productSlug: "toi-ly-son-loai-1", productName: "Tỏi Lý Sơn loại 1", who: "Cửa hàng Thu Hà", where: "Hội An",
    date: "2026-10-03", stars: 5, hasPhoto: true,
    text: "Khách quán ăn khen tỏi cay và giòn. Tem truy xuất giúp tôi tư vấn cho khách dễ hơn.",
  },
  {
    id: "r3", productSlug: "toi-ly-son-loai-1", productName: "Tỏi Lý Sơn loại 1", who: "Tạp hoá Ngọc Lan", where: "Tam Kỳ",
    date: "2026-09-21", stars: 4, hasPhoto: false,
    text: "Hàng tốt, giao đúng lịch. Có vài củ hơi nhỏ so với loại 1 nhưng chấp nhận được.",
  },
  {
    id: "r4", productSlug: "toi-co-don-ly-son", productName: "Tỏi cô đơn Lý Sơn", who: "Cửa hàng Thu Hà", where: "Hội An",
    date: "2026-09-28", stars: 5, hasPhoto: false,
    text: "Tỏi cô đơn hàng tuyển, khách quán ăn của tôi rất chuộng. Xem công nợ rõ ràng từng đơn.",
  },
  {
    id: "r5", productSlug: "toi-kho-phan-rang", productName: "Tỏi khô Phan Rang", who: "Tạp hoá Ngọc Lan", where: "Tam Kỳ",
    date: "2026-09-14", stars: 4, hasPhoto: false,
    text: "Giao đúng lịch. Mong có thêm quy cách bao 5kg cho tỏi khô.",
  },
];
