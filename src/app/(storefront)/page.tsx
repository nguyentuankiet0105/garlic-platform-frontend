import { ArrowRight, BadgeCheck, Truck, Wallet } from "lucide-react";
import { ProductCard } from "@/features/catalog";
import { catalogServer } from "@/features/catalog/server";
import { PostCard } from "@/features/content";
import { createContentApi } from "@/features/content";
import { serverHttp } from "@/shared/lib/api/server";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { Badge, ButtonLink, Container } from "@/shared/ui";

const VALUE_PROPS = [
  {
    icon: BadgeCheck,
    title: "Giá sỉ theo cấp",
    text: "Đạt sản lượng, lên cấp, giá tốt hơn — minh bạch ngay trong bảng giá.",
  },
  {
    icon: Wallet,
    title: "Hạn mức công nợ",
    text: "Nhập hàng trước, thanh toán sau trong hạn mức được duyệt cho từng đại lý.",
  },
  { icon: Truck, title: "Giao tận kho", text: "Tỏi Lý Sơn, tỏi khô, tỏi phi giao theo lịch cố định hằng tuần." },
];

export default async function HomePage() {
  const [{ items: products }, posts] = await Promise.all([
    catalogServer().listProducts(),
    createContentApi(serverHttp("catalog")).listPosts(),
  ]);

  return (
    <>
      <section className="bg-hero text-white">
        <Container className="grid gap-10 py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:py-28">
          <div className="grid gap-6">
            <Badge tone="garlic" className="w-fit">
              Dành cho đại lý & nhà phân phối
            </Badge>
            <h1 className="font-display text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Tỏi sỉ chuẩn nguồn,
              <br />
              giá theo cấp đại lý.
            </h1>
            <p className="text-brand-100/85 max-w-xl text-lg">{SITE.description}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={ROUTES.becomeAgent} variant="accent" size="lg">
                Đăng ký làm đại lý <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href={ROUTES.storefront.products}
                variant="outline"
                size="lg"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10"
              >
                Xem sản phẩm
              </ButtonLink>
            </div>
          </div>
          <div className="relative hidden aspect-square place-items-center md:grid">
            <div className="bg-brand-400/15 absolute inset-6 rounded-full blur-3xl" />
            <div className="relative grid size-72 place-items-center rounded-[2.5rem] border border-white/15 bg-white/5 text-[9rem] shadow-2xl backdrop-blur">
              <span aria-hidden>🧄</span>
            </div>
          </div>
        </Container>
      </section>

      <Container className="-mt-10 grid gap-4 md:grid-cols-3">
        {VALUE_PROPS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="border-border bg-card flex gap-4 rounded-(--radius-card) border p-5 shadow-md">
            <span className="bg-primary-soft text-primary-soft-foreground grid size-11 shrink-0 place-items-center rounded-xl">
              <Icon className="size-5" />
            </span>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{text}</p>
            </div>
          </div>
        ))}
      </Container>

      <Container className="mt-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Sản phẩm nổi bật</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Giá niêm yết — đăng nhập để xem giá sỉ theo cấp của bạn.
            </p>
          </div>
          <ButtonLink href={ROUTES.storefront.products} variant="soft" size="sm">
            Xem tất cả
          </ButtonLink>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>

      <Container className="mt-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Hướng dẫn & review từ đại lý</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {posts.slice(0, 4).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
