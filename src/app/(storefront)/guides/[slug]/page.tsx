import { Container } from "@/shared/ui";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <Container className="py-12">
      <FeaturePlaceholder
        title={`Bài viết: ${slug}`}
        description="Trang chi tiết bài viết / review."
        service="Catalog & Order service — Content module"
        planned={[
          "Nội dung markdown + mục lục",
          "Sản phẩm liên quan (productSlug)",
          "Metadata SEO + Open Graph",
          "Bài liên quan",
        ]}
      />
    </Container>
  );
}
