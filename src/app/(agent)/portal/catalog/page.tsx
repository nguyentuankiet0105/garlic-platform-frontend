import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Sản phẩm & giá sỉ" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Sản phẩm & giá sỉ"
      description="Danh mục kèm giá sỉ theo cấp của bạn."
      service="Catalog service + Agent service (bảng giá)"
      planned={[
        "Lọc & tìm kiếm sản phẩm",
        "Giá sỉ theo cấp đại lý",
        "Thêm nhanh vào giỏ",
        "Hiển thị tồn kho & quy cách",
      ]}
    />
  );
}
