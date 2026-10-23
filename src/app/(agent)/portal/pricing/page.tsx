import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Cấp đại lý" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Cấp đại lý"
      description="Các cấp, ngưỡng sản lượng và ưu đãi."
      service="Agent service"
      planned={["Bảng so sánh 3 cấp", "Tiến độ lên cấp", "Hạn mức công nợ theo cấp"]}
    />
  );
}
