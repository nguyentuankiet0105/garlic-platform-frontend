import { PackageSearch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Award, Info } from "lucide-react";
import { TierBadge } from "@/features/agents";
import {
  CATEGORY_LABEL,
  ORIGIN_LABEL,
  PACK_UNITS,
  ProductCard,
  ProductFilters,
  ProductSortSelect,
  SORT_LABEL,
  type ProductCategory,
  type ProductOrigin,
  type ProductQuery,
  type ProductSort,
} from "@/features/catalog";
import { catalogServer } from "@/features/catalog/server";
import { ROUTES } from "@/shared/config/routes";
import { Breadcrumb, ButtonLink, Container, EmptyState, Pagination } from "@/shared/ui";
import { getViewer } from "@/zones/storefront/lib/viewer";

export const metadata: Metadata = { title: "Sản phẩm" };

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const pick = <T extends string>(v: string | undefined, allowed: readonly T[]): T | undefined =>
  allowed.includes(v as T) ? (v as T) : undefined;

function parseQuery(sp: SP): ProductQuery {
  const page = Number(one(sp.page));
  return {
    q: one(sp.q)?.trim() || undefined,
    category: pick(one(sp.category), Object.keys(CATEGORY_LABEL) as ProductCategory[]),
    origin: pick(one(sp.origin), Object.keys(ORIGIN_LABEL) as ProductOrigin[]),
    pack: pick(one(sp.pack), PACK_UNITS),
    inStock: one(sp.instock) === "1" || undefined,
    sort: pick(one(sp.sort), Object.keys(SORT_LABEL) as ProductSort[]),
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const query = parseQuery(await searchParams);
  const viewer = await getViewer();
  const api = catalogServer({ tier: viewer.kind === "agent" ? viewer.tier : undefined });
  const [{ items, total, pageSize }, counts] = await Promise.all([api.listProducts(query), api.categoryCounts(query.q)]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const hrefFor = (page: number) => {
    const sp = new URLSearchParams();
    if (query.q) sp.set("q", query.q);
    if (query.category) sp.set("category", query.category);
    if (query.origin) sp.set("origin", query.origin);
    if (query.pack) sp.set("pack", query.pack);
    if (query.inStock) sp.set("instock", "1");
    if (query.sort) sp.set("sort", query.sort);
    if (page > 1) sp.set("page", String(page));
    const qs = sp.toString();
    return qs ? `${ROUTES.storefront.products}?${qs}` : ROUTES.storefront.products;
  };

  return (
    <Container className="py-8 pb-16">
      <Breadcrumb items={[{ label: "Trang chủ", href: ROUTES.home }, { label: "Sản phẩm" }]} />

      <div className="mt-4 mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="font-display text-4xl leading-[44px] font-semibold">Sản phẩm</h1>
          <p className="text-muted-foreground text-sm" aria-live="polite">
            {query.q ? `Kết quả cho “${query.q}” · ` : ""}
            {total} sản phẩm · Đơn vị bán theo bao hoặc thùng
          </p>
        </div>
        <ProductSortSelect value={query.sort ?? "popular"} />
      </div>

      <ViewerNote viewer={viewer.kind} tier={viewer.tier} />

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <ProductFilters counts={counts} />
        <section aria-label="Kết quả">
          {items.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} viewer={viewer.kind} showMeta />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={PackageSearch}
              title="Chưa có sản phẩm phù hợp"
              description="Thử bỏ bớt bộ lọc hoặc xem tất cả sản phẩm."
              action={<ButtonLink href={ROUTES.storefront.products} variant="outline">Xem tất cả sản phẩm</ButtonLink>}
            />
          )}
          <Pagination page={Math.min(query.page ?? 1, totalPages)} totalPages={totalPages} hrefFor={hrefFor} />
        </section>
      </div>
    </Container>
  );
}

function ViewerNote({ viewer, tier }: { viewer: "guest" | "pending" | "agent"; tier?: "T1" | "T2" | "T3" }) {
  const box = "flex flex-wrap items-center gap-x-4 gap-y-2 rounded-(--radius-card) border px-4 py-3 text-sm";
  if (viewer === "agent" && tier)
    return (
      <div role="note" className={`${box} border-brand-200 bg-success-50 text-[#1e2620]`}>
        <TierBadge tier={tier} />
        <span>Đang hiển thị giá sỉ theo cấp của bạn.</span>
        <Link href={ROUTES.agent.debt} className="ml-auto font-semibold">
          Xem công nợ →
        </Link>
      </div>
    );
  if (viewer === "pending")
    return (
      <div role="note" className={`${box} border-warning-border bg-warning-50 text-[#3b2a00]`}>
        <Info className="size-[18px] shrink-0" aria-hidden />
        <span>
          <strong>Giá sỉ sẽ hiển thị khi hồ sơ được duyệt.</strong> Bạn có thể xem sản phẩm trong lúc chờ.
        </span>
        <Link href={ROUTES.pendingApproval} className="ml-auto font-semibold text-[#7a4f00]">
          Xem tiến trình duyệt
        </Link>
      </div>
    );
  return (
    <div role="note" className={`${box} border-info-600/25 bg-info-50 text-[#1e2620]`}>
      <Award className="text-info-600 size-[18px] shrink-0" aria-hidden />
      <span>
        <strong>Giá sỉ chỉ hiển thị cho đại lý đã được duyệt.</strong> Mỗi cấp đại lý có bảng giá và hạn mức công nợ riêng.
      </span>
      <div className="ml-auto flex gap-2">
        <ButtonLink href={ROUTES.login} variant="outline" size="sm">
          Đăng nhập
        </ButtonLink>
        <ButtonLink href={ROUTES.becomeAgent} size="sm">
          Đăng ký đại lý
        </ButtonLink>
      </div>
    </div>
  );
}
