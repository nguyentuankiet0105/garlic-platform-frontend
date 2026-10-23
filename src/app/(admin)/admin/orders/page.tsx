import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Đơn hàng" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Đơn hàng"
      description="Xử lý đơn sỉ từ đại lý."
      service="Order service"
      planned={["Bảng đơn + bộ lọc", "Cập nhật trạng thái", "In phiếu giao hàng"]}
    />
  );
}
