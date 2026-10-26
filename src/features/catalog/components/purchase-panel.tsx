import { Award, Clock, Lock } from "lucide-react";
import { TIER_NAME, type AgentTier } from "@/features/agents";
import { ROUTES } from "@/shared/config/routes";
import { formatVnd } from "@/shared/lib/format";
import type { ViewerKind } from "@/shared/types/viewer";
import { ButtonLink } from "@/shared/ui";
import type { Product } from "../types";
import { AddToCart } from "./add-to-cart";

const TIERS: AgentTier[] = ["T1", "T2", "T3"];

/** Khối mua hàng ở trang chi tiết: 3 trạng thái người xem (design §ProductDetail). */
export function PurchasePanel({ product, viewer }: { product: Product; viewer: ViewerKind }) {
  const box = "border-border bg-card grid gap-4 rounded-(--radius-card) border p-5";

  if (viewer === "agent" && product.price) {
    return (
      <div className={box}>
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-brand-800 dark:text-brand-200 text-[32px] leading-10 font-bold">
            {formatVnd(product.price.perPack)}
          </span>
          <span className="text-muted-foreground text-sm">/ {product.packLabel.toLowerCase()}</span>
          <span className="bg-primary-soft text-primary-soft-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
            <Award className="size-3.5" aria-hidden />
            Giá cấp {TIER_NAME[product.price.tier]}
          </span>
        </div>
        <AddToCart
          productName={product.name}
          packUnit={product.packUnit}
          packLabel={product.packLabel}
          minPacks={product.minPacks}
          packStep={product.packStep}
          unitPrice={product.price.perPack}
          disabled={product.stock === "out"}
        />
      </div>
    );
  }

  if (viewer === "pending") {
    return (
      <div className={box}>
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-warning-50 text-[#7a4f00]">
            <Clock className="size-5" aria-hidden />
          </span>
          <div className="grid gap-0.5">
            <p className="font-semibold">Giá hiển thị sau khi được duyệt</p>
            <p className="text-muted-foreground text-sm">Hồ sơ của bạn đang chờ xác minh.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={ROUTES.pendingApproval}>Xem tiến trình duyệt</ButtonLink>
          <ButtonLink href={ROUTES.storefront.products} variant="outline">
            Xem sản phẩm khác
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className={box}>
      <div className="flex items-start gap-3">
        <span className="bg-muted grid size-10 shrink-0 place-items-center rounded-full">
          <Lock className="size-5" aria-hidden />
        </span>
        <div className="grid gap-0.5">
          <p className="font-semibold">Đăng nhập để xem giá sỉ</p>
          <p className="text-muted-foreground text-sm">Giá theo cấp đại lý của bạn.</p>
        </div>
      </div>
      <div aria-label="Có ba mức giá theo cấp" className="flex flex-wrap gap-2">
        {TIERS.map((t) => (
          <span key={t} className="bg-muted inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold">
            <Award className="size-3.5" aria-hidden />
            {TIER_NAME[t]} · <span aria-hidden>••••đ</span>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={ROUTES.login}>Đăng nhập</ButtonLink>
        <ButtonLink href={ROUTES.becomeAgent} variant="outline">
          Đăng ký làm đại lý
        </ButtonLink>
      </div>
    </div>
  );
}
