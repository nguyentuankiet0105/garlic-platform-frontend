import { ArrowRight, Check, Clock, Truck } from "lucide-react";
import Link from "next/link";
import { TierBadge, TIER_NAME, type AgentTier } from "@/features/agents";
import { CATEGORY_DESC, CATEGORY_LABEL, ProductCard, type ProductCategory } from "@/features/catalog";
import { catalogServer } from "@/features/catalog/server";
import { PostCard, ReviewQuote } from "@/features/content";
import { contentServer } from "@/features/content/server";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { ButtonLink, Container, ImagePlaceholder, Overline } from "@/shared/ui";
import { getViewer } from "@/zones/storefront/lib/viewer";

const CATEGORIES = Object.keys(CATEGORY_LABEL) as ProductCategory[];

const STEPS = [
  ["Đăng ký hồ sơ", "Thông tin cửa hàng, mã số thuế, địa chỉ nhận hàng."],
  ["Chờ duyệt", `Đội kinh doanh xác minh trong ${SITE.policy.approvalTime}. Kết quả gửi qua email.`],
  ["Được xếp cấp", "Cấp đại lý quyết định bảng giá sỉ và hạn mức công nợ."],
  ["Đặt hàng", "Đặt mới hoặc đặt lại đơn cũ, thanh toán công nợ online."],
] as const;

const TIER_COPY: Record<AgentTier, string> = {
  T1: "Dành cho đại lý mới. Bắt đầu với bảng giá sỉ cơ bản và hạn mức công nợ khởi điểm.",
  T2: "Đại lý có sản lượng ổn định. Giá tốt hơn và hạn mức công nợ cao hơn.",
  T3: "Đại lý chiến lược. Giá sỉ tốt nhất và hạn mức công nợ cao nhất.",
};

export default async function HomePage() {
  const viewer = await getViewer();
  const tier = viewer.kind === "agent" ? viewer.tier : undefined;
  const content = contentServer();
  const [{ items: products }, reviews, posts] = await Promise.all([
    catalogServer({ tier }).listProducts({ pageSize: 4 }),
    content.listReviews(),
    content.listPosts(),
  ]);

  const featSub =
    viewer.kind === "agent"
      ? "Giá sỉ theo cấp đại lý của bạn."
      : viewer.kind === "pending"
        ? "Giá sỉ hiển thị khi hồ sơ đại lý được duyệt."
        : "Giá sỉ hiển thị sau khi tài khoản đại lý được duyệt.";

  return (
    <>
      {viewer.kind === "pending" && (
        <div className="border-warning-border bg-warning-50 border-b text-[13px] leading-[18px] text-[#3b2a00]">
          <Container className="flex flex-wrap justify-between gap-2 py-2">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              <strong className="font-semibold">Hồ sơ đại lý đang chờ duyệt.</strong> Giá sỉ sẽ hiển thị khi tài khoản được duyệt.
            </span>
            <Link href={ROUTES.pendingApproval} className="font-semibold text-[#7a4f00]">
              Xem tiến trình →
            </Link>
          </Container>
        </div>
      )}

      {/* Hero */}
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-[72px]">
        <div className="grid gap-6">
          <Overline className="text-[13px]">Nguồn tỏi Lý Sơn · Phan Rang</Overline>
          <h1 className="font-display text-5xl leading-[1.18] font-semibold tracking-tight lg:text-[56px] lg:leading-[66px]">
            Tỏi sỉ tận gốc,
            <br />
            giá theo cấp đại lý
          </h1>
          <p className="text-muted-foreground max-w-[540px] text-lg leading-7">
            Nhập tỏi trực tiếp từ vùng trồng, đặt hàng theo bao hoặc thùng, theo dõi công nợ và đặt lại đơn cũ chỉ trong vài chạm.
          </p>
          <div className="flex flex-wrap gap-3">
            {viewer.kind === "agent" ? (
              <ButtonLink href={ROUTES.agent.root} size="lg">
                Vào cổng đại lý <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            ) : viewer.kind === "pending" ? (
              <ButtonLink href={ROUTES.pendingApproval} size="lg">
                Xem tiến trình duyệt hồ sơ
              </ButtonLink>
            ) : (
              <ButtonLink href={ROUTES.becomeAgent} size="lg">
                Đăng ký làm đại lý
              </ButtonLink>
            )}
            <ButtonLink href={ROUTES.storefront.products} variant="outline" size="lg">
              Xem sản phẩm
            </ButtonLink>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {["Giá sỉ riêng theo cấp", "Mua trước, trả sau trong hạn mức", "Có nguồn gốc từng lô"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="text-primary size-[18px]" strokeWidth={2.2} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ImagePlaceholder
            label="Ảnh: ruộng tỏi trên đảo Lý Sơn"
            caption="Ảnh: ruộng tỏi Lý Sơn"
            iconSize={56}
            className="row-span-2 min-h-[460px] rounded-[20px] p-6"
          />
          <ImagePlaceholder
            label="Ảnh: tỏi cô đơn cận cảnh"
            caption="Ảnh: tỏi cô đơn cận cảnh"
            iconSize={32}
            className="min-h-[222px] rounded-[20px] p-4"
          />
          <div className="bg-brand-700 text-brand-50 flex min-h-[222px] flex-col justify-between rounded-[20px] p-6">
            <Truck className="text-brand-200 size-8" aria-hidden />
            <div className="grid gap-1">
              <span className="font-display text-[22px] leading-7 font-semibold">Giao theo lịch cố định</span>
              <span className="text-brand-100 text-sm leading-5">{SITE.policy.delivery}</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Danh mục */}
      <Container className="grid gap-6 pb-[72px]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-[32px] leading-10 font-semibold">Danh mục</h2>
          <Link href={ROUTES.storefront.products} className="text-[15px] font-semibold">
            Tất cả sản phẩm →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`${ROUTES.storefront.products}?category=${c}`}
              className="border-border bg-card text-foreground flex items-center gap-4 rounded-(--radius-card) border p-4 no-underline transition-colors hover:border-border-strong"
            >
              <ImagePlaceholder label={`Ảnh danh mục ${CATEGORY_LABEL[c]}`} iconSize={32} className="size-[72px] shrink-0 rounded-xl" />
              <span className="grid gap-0.5">
                <span className="text-[17px] leading-6 font-semibold">{CATEGORY_LABEL[c]}</span>
                <span className="text-muted-foreground text-sm leading-5">{CATEGORY_DESC[c]}</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>

      {/* Bán chạy */}
      <section aria-labelledby="feat-h" className="bg-muted border-border border-y">
        <Container className="grid gap-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="grid gap-1.5">
              <h2 id="feat-h" className="font-display text-[32px] leading-10 font-semibold">
                Sản phẩm bán chạy
              </h2>
              <span className="text-muted-foreground text-[15px]">{featSub}</span>
            </div>
            <Link href={ROUTES.storefront.products} className="text-[15px] font-semibold">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} viewer={viewer.kind} />
            ))}
          </div>
        </Container>
      </section>

      {/* Trở thành đại lý */}
      <Container className="grid gap-8 py-[72px]" id="how">
        <div className="grid max-w-[640px] gap-2">
          <Overline className="text-[13px]">Trở thành đại lý</Overline>
          <h2 className="font-display text-4xl leading-[44px] font-semibold">Bốn bước để nhập hàng giá sỉ</h2>
        </div>
        <ol className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="border-border bg-card grid content-start gap-2.5 rounded-(--radius-card) border p-6">
              <span className="bg-primary text-primary-foreground grid size-9 place-items-center rounded-full font-bold">{i + 1}</span>
              <span className="text-lg leading-[26px] font-semibold">{title}</span>
              <span className="text-muted-foreground text-sm leading-5">{text}</span>
            </li>
          ))}
        </ol>
        <div className="grid gap-4 md:grid-cols-3">
          {(["T1", "T2", "T3"] as const).map((t) => (
            <div key={t} className="border-border bg-card grid content-start gap-3 rounded-(--radius-card) border p-6">
              <TierBadge tier={t} className="w-fit" />
              <span className="text-muted-foreground text-[15px] leading-[22px]">
                <span className="sr-only">Cấp {TIER_NAME[t]}. </span>
                {TIER_COPY[t]}
              </span>
            </div>
          ))}
        </div>
      </Container>

      {/* Đánh giá */}
      <section aria-labelledby="rv-h" className="bg-card border-border border-y">
        <Container className="grid gap-6 py-16">
          <h2 id="rv-h" className="font-display text-[32px] leading-10 font-semibold">
            Đại lý nói gì
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <ReviewQuote key={r.id} review={r} />
            ))}
          </div>
        </Container>
      </section>

      {/* Hướng dẫn & Blog */}
      <Container className="grid gap-6 py-[72px]" id="guides">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-[32px] leading-10 font-semibold">Hướng dẫn &amp; Blog</h2>
          <Link href={ROUTES.storefront.guides} className="text-[15px] font-semibold">
            Tất cả bài viết →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <div key={p.id} className="relative">
              <PostCard post={p} />
            </div>
          ))}
        </div>
      </Container>

      {viewer.kind === "guest" && (
        <Container className="pb-[72px]">
          <div className="bg-brand-700 text-brand-50 flex flex-wrap items-center justify-between gap-6 rounded-3xl p-8 sm:p-12">
            <div className="grid max-w-[620px] gap-2">
              <h2 className="font-display text-[34px] leading-[42px] font-semibold">Sẵn sàng nhập tỏi cho cửa hàng?</h2>
              <p className="text-brand-100">
                Đăng ký miễn phí. Sau khi duyệt, bạn thấy ngay giá sỉ theo cấp và hạn mức công nợ của mình.
              </p>
            </div>
            <ButtonLink href={ROUTES.becomeAgent} variant="inverse" size="lg">
              Đăng ký làm đại lý
            </ButtonLink>
          </div>
        </Container>
      )}
    </>
  );
}
