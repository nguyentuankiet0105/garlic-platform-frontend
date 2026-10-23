import type { Metadata } from "next";
import { ProductCard } from "@/features/catalog";
import { catalogServer } from "@/features/catalog/server";
import { Container, PageHeader } from "@/shared/ui";

export const metadata: Metadata = { title: "Sản phẩm" };

export default async function ProductsPage() {
  const { items } = await catalogServer().listProducts();
  return (
    <Container className="py-12">
      <PageHeader
        title="Sản phẩm"
        description="Tỏi tươi, tỏi khô, tỏi chế biến và tỏi đen — đóng gói theo quy cách sỉ."
      />
      {/* TODO: bộ lọc danh mục + tìm kiếm (searchParams → catalogServer().listProducts({ q, category })) */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Container>
  );
}
