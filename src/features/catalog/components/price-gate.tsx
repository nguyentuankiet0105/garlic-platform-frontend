import { Clock, Lock } from "lucide-react";
import Link from "next/link";
import { TIER_NAME } from "@/features/agents";
import { ROUTES } from "@/shared/config/routes";
import { formatVnd } from "@/shared/lib/format";
import type { ViewerKind } from "@/shared/types/viewer";
import type { Product } from "../types";

/**
 * Khối giá trên thẻ sản phẩm. Quy tắc cứng: chỉ viewer === "agent" VÀ server đã gắn product.price mới hiện số tiền.
 * Khách / chờ duyệt không bao giờ có product.price (xem catalog.api) nên UI không có gì để lộ.
 */
export function PriceGate({ product, viewer }: { product: Product; viewer: ViewerKind }) {
  if (viewer === "pending") {
    return (
      <div className="flex items-center gap-2 rounded-[10px] bg-warning-50 px-3 py-2.5 text-sm leading-5 font-semibold text-[#5c3d00]">
        <Clock className="size-4 shrink-0" aria-hidden />
        Giá hiển thị sau khi được duyệt
      </div>
    );
  }
  if (viewer === "agent" && product.price) {
    const unit = product.packLabel.toLowerCase();
    return (
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-brand-800 dark:text-brand-200 text-[22px] leading-7 font-bold">
          {formatVnd(product.price.perPack)}
        </span>
        <span className="text-muted-foreground text-[13px]">
          / {unit} · giá cấp {TIER_NAME[product.price.tier]}
        </span>
      </div>
    );
  }
  return (
    <Link
      href={ROUTES.login}
      className="bg-muted text-foreground hover:bg-border flex items-center gap-2 rounded-[10px] px-3 py-2.5 text-sm font-semibold no-underline transition-colors"
    >
      <Lock className="size-4 shrink-0" aria-hidden />
      Đăng nhập để xem giá sỉ
    </Link>
  );
}
