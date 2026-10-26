/**
 * Thông tin thương hiệu + nội dung chính sách dùng chung.
 * "Tỏi Mộc" là tên tạm theo design (đổi ở đây là đổi toàn site).
 * Các dòng trong `policy` là văn bản trung tính — thay bằng chính sách thật của doanh nghiệp.
 */
export const SITE = {
  name: "Tỏi Mộc",
  tagline: "Tỏi sỉ tận gốc cho đại lý — giá theo cấp, giao theo lịch",
  description:
    "Nhập tỏi trực tiếp từ vùng trồng Lý Sơn, Phan Rang: đặt theo bao hoặc thùng, giá sỉ theo cấp đại lý, theo dõi công nợ và đặt lại đơn cũ chỉ trong vài chạm.",
  supportEmail: "sales@garlichub.dev",
  hotline: "0900 000 000",
  hotlineHours: "8:00 – 17:30, thứ Hai đến thứ Bảy",
  warehouse: "Kho: Đà Nẵng (địa chỉ chi tiết cập nhật sau)",
  policy: {
    approvalTime: "1–2 ngày làm việc",
    delivery: "Giao theo lịch cố định, khu vực và tần suất xác nhận khi đặt hàng.",
    returns: "Đổi trả trong 24 giờ nếu hàng sai quy cách hoặc hư hỏng, kèm ảnh chụp.",
    resetLinkTtl: "30 phút",
  },
} as const;
