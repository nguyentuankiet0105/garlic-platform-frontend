import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Đặt lại nhanh" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Đặt lại nhanh"
      description="Danh sách mặt hàng hay nhập."
      service="Agent service"
      planned={["Mặt hàng yêu thích", "Đặt lại 1 chạm", "Gợi ý theo chu kỳ nhập"]}
    />
  );
}
