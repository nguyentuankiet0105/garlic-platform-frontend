import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Sản phẩm & kho" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Sản phẩm & kho"
      description="CRUD sản phẩm, danh mục, tồn kho."
      service="Catalog service (+ S3 presigned URL cho ảnh)"
      planned={[
        "Bảng sản phẩm + tìm kiếm",
        "Form tạo/sửa (RHF + zod)",
        "Upload ảnh trực tiếp lên S3",
        "Điều chỉnh tồn kho",
      ]}
    />
  );
}
