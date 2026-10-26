import { RotateCcw, Truck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_LABEL,
  ORIGIN_LABEL,
  ProductImage,
  PurchasePanel,
  StockBadge,
  packSummary,
} from "@/features/catalog";
import { catalogServer } from "@/features/catalog/server";
import { PostCard, ReviewSection } from "@/features/content";
import { contentServer } from "@/features/content/server";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { Breadcrumb, Container, ImagePlaceholder, Overline, Stars } from "@/shared/ui";
import { getViewer } from "@/zones/storefront/lib/viewer";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Metadata chỉ cần tên → gọi không kèm cấp (không bao giờ cần giá ở đây).
  const product = await catalogServer().getProduct(slug);
  return { title: product?.name ?? "Sản phẩm", description: product?.summary };
}

const THUMBS = ["Ảnh 1: bao tỏi", "Ảnh 2: tép tỏi cận cảnh", "Ảnh 3: tem truy xuất", "Ảnh 4: kho hàng"];

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const viewer = await getViewer();
  const product = await catalogServer({ tier: viewer.kind === "agent" ? viewer.tier : undefined }).getProduct(slug);
  if (!product) notFound();

  const content = contentServer();
  const [reviews, guides] = await Promise.all([content.listReviews(slug), content.listPostsForProduct(slug)]);
  const { rating } = product;

  return (
    <Container className="py-8 pb-16">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: ROUTES.home },
          { label: "Sản phẩm", href: ROUTES.storefront.products },
          { label: CATEGORY_LABEL[product.category], href: `${ROUTES.storefront.products}?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="grid content-start gap-3">
          <ProductImage name={product.name} className="aspect-square h-auto rounded-(--radius-card)" iconSize={72} />
          <div className="grid grid-cols-4 gap-3">
            {THUMBS.map((t) => (
              <ImagePlaceholder key={t} label={t} iconSize={24} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>

        <div className="grid content-start gap-5">
          <div className="grid gap-2">
            <Overline>
              {CATEGORY_LABEL[product.category]} · {ORIGIN_LABEL[product.origin]}
            </Overline>
            <h1 className="font-display text-4xl leading-[44px] font-semibold">{product.name}</h1>
            {rating ? (
              <a href="#danh-gia" className="text-foreground flex flex-wrap items-center gap-2 no-underline">
                <Stars value={rating.average} />
                <span className="font-semibold">{rating.average}</span>
                <span className="text-muted-foreground text-sm">{rating.count} đánh giá từ đại lý đã mua</span>
              </a>
            ) : (
              <span className="text-muted-foreground text-sm">Chưa có đánh giá</span>
            )}
          </div>

          <p className="text-muted-foreground leading-7">{product.summary}</p>

          <dl className="border-border bg-card grid grid-cols-2 gap-x-6 gap-y-4 rounded-(--radius-card) border p-5 text-sm">
            <Spec k="Quy cách" v={product.packLabel} />
            <Spec
              k="Đặt tối thiểu"
              v={`${product.minPacks} ${product.packUnit}${product.packStep > 1 ? ` · bội số ${product.packStep}` : ""}`}
            />
            <Spec k="Vùng trồng" v={ORIGIN_LABEL[product.origin]} />
            <div className="grid gap-1">
              <dt className="text-muted-foreground">Tình trạng kho</dt>
              <dd>
                <StockBadge stock={product.stock} />
              </dd>
            </div>
          </dl>

          <PurchasePanel product={product} viewer={viewer.kind} />

          <ul className="text-muted-foreground grid gap-2 text-sm">
            <li className="flex items-start gap-2">
              <Truck className="mt-0.5 size-4 shrink-0" aria-hidden />
              Giao hàng: {SITE.policy.delivery}
            </li>
            <li className="flex items-start gap-2">
              <RotateCcw className="mt-0.5 size-4 shrink-0" aria-hidden />
              Đổi trả: {SITE.policy.returns}
            </li>
          </ul>
        </div>
      </div>

      <nav aria-label="Nội dung sản phẩm" className="border-border mt-14 flex gap-6 border-b">
        {[
          ["#mo-ta", "Mô tả"],
          ["#danh-gia", `Đánh giá${rating ? ` (${rating.count})` : ""}`],
          ["#huong-dan", "Hướng dẫn liên quan"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="text-muted-foreground hover:text-foreground -mb-px border-b-2 border-transparent py-3 text-[15px] font-semibold no-underline hover:border-current">
            {label}
          </a>
        ))}
      </nav>

      <section id="mo-ta" aria-labelledby="mt-h" className="grid scroll-mt-32 gap-5 pt-10 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-3">
          <h2 id="mt-h" className="font-display text-[28px] leading-9 font-semibold">
            Mô tả sản phẩm
          </h2>
          <p className="leading-7">{product.description}</p>
          <p className="text-muted-foreground text-sm">{packSummary(product)}</p>
        </div>
        <div className="bg-muted grid content-start gap-1 rounded-(--radius-card) p-5">
          <span className="font-semibold">Bảo quản</span>
          <span className="text-muted-foreground text-sm leading-6">{product.storage}</span>
        </div>
      </section>

      <section id="danh-gia" aria-labelledby="dg-h" className="grid scroll-mt-32 gap-5 pt-14">
        <div className="grid gap-1">
          <h2 id="dg-h" className="font-display text-[28px] leading-9 font-semibold">
            Đánh giá từ đại lý
          </h2>
          <p className="text-muted-foreground text-sm">
            Chỉ đại lý đã nhận hàng mới viết được đánh giá, từ trang chi tiết đơn hàng. Mã đơn và số lượng đặt không hiển
            thị công khai.
          </p>
        </div>
        <ReviewSection summary={rating} reviews={reviews} />
      </section>

      {guides.length > 0 && (
        <section id="huong-dan" aria-labelledby="hd-h" className="grid scroll-mt-32 gap-5 pt-14">
          <h2 id="hd-h" className="font-display text-[28px] leading-9 font-semibold">
            Hướng dẫn liên quan
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <div key={g.id} className="relative">
                <PostCard post={g} />
              </div>
            ))}
          </div>
          <Link href={ROUTES.storefront.guides} className="text-sm font-semibold">
            Tất cả hướng dẫn →
          </Link>
        </section>
      )}
    </Container>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid gap-1">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}
