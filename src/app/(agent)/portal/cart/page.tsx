import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Giỏ hàng" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Giỏ hàng"
      description="Kiểm tra đơn trước khi đặt."
      service="Order service (đồng bộ sang Agent service để check hạn mức)"
      planned={[
        "Giỏ hàng lưu client (localStorage)",
        "Kiểm tra hạn mức công nợ khi checkout",
        "Chọn địa chỉ & lịch giao",
        "Xử lý lỗi 409 CREDIT_LIMIT_EXCEEDED",
      ]}
    />
  );
}
