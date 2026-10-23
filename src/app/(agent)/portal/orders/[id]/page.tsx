import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Chi tiết đơn hàng" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Chi tiết đơn hàng"
      description="Chi tiết, timeline giao hàng và viết review."
      service="Order service + Content module"
      planned={[
        "Timeline trạng thái",
        "Danh sách dòng hàng",
        "Viết review từ đơn đã giao (nhãn Đã mua hàng)",
        "Đặt lại đơn",
      ]}
    />
  );
}
