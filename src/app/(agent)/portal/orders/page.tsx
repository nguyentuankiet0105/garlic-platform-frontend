import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Đơn hàng" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Đơn hàng"
      description="Lịch sử và trạng thái đơn."
      service="Order service"
      planned={["Danh sách + lọc theo trạng thái", "Phân trang", "Xuất hoá đơn"]}
    />
  );
}
