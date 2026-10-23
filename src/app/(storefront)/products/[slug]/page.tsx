import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_LABEL, ProductVisual } from "@/features/catalog";
import { catalogServer } from "@/features/catalog/server";
import { ROUTES } from "@/shared/config/routes";
import { formatVnd } from "@/shared/lib/format";
import { Badge, ButtonLink, Card, CardContent, CardHeader, CardTitle, Container } from "@/shared/ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await catalogServer().getProduct(slug);
  return { title: product?.name ?? "Sản phẩm" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await catalogServer().getProduct(slug);
  if (!product) notFound();

  return (
    <Container className="grid gap-10 py-12 lg:grid-cols-2">
      <ProductVisual category={product.category} className="rounded-(--radius-card) text-9xl" />
      <div className="grid content-start gap-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{CATEGORY_LABEL[product.category]}</Badge>
          {product.tags.map((t) => (
            <Badge key={t} tone="garlic">
              {t}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
        <p className="text-muted-foreground">{product.description}</p>
        <Card>
          <CardHeader>
            <CardTitle>Thông tin đặt hàng sỉ</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <Row k="Xuất xứ" v={product.origin} />
            <Row k="Giá niêm yết" v={`${formatVnd(product.listPricePerKg)}/kg`} />
            <Row k="Đặt tối thiểu" v={`${product.minOrderKg} kg`} />
            <Row k="Tồn kho" v={`${product.stockKg.toLocaleString("vi-VN")} kg`} />
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <ButtonLink href={ROUTES.login} size="lg">
            Đăng nhập để xem giá sỉ
          </ButtonLink>
          <ButtonLink href={ROUTES.becomeAgent} variant="outline" size="lg">
            Đăng ký đại lý
          </ButtonLink>
        </div>
        {/* TODO: khối Reviews (Content module) lọc theo productSlug, nhãn "Đã mua hàng" */}
      </div>
    </Container>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-border/60 flex justify-between gap-4 border-b pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
