import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Review & bài viết" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Review & bài viết"
      description="Kiểm duyệt review và quản lý bài hướng dẫn."
      service="Catalog service — Content module"
      planned={["Duyệt / ẩn review", "Soạn bài hướng dẫn", "Gắn bài với sản phẩm"]}
    />
  );
}
