import { Check } from "lucide-react";
import { formatDate } from "@/shared/lib/format";
import { Stars } from "@/shared/ui";
import type { Review } from "../types";

const initials = (name: string) =>
  name
    .replace(/^(Đại lý|Cửa hàng|Tạp hoá)\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function VerifiedBadge() {
  return (
    <span className="bg-primary-soft text-primary-soft-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold">
      <Check className="size-3" strokeWidth={3} aria-hidden />
      Đã mua hàng
    </span>
  );
}

/** Đánh giá chi tiết (trang sản phẩm). */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-border bg-card grid gap-3 rounded-(--radius-card) border p-5">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="bg-primary-soft text-primary-soft-foreground grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold"
        >
          {initials(review.who)}
        </span>
        <div className="grid min-w-0 flex-1">
          <span className="font-semibold">{review.who}</span>
          <span className="text-muted-foreground text-[13px]">
            {review.where} · {formatDate(review.date)}
          </span>
        </div>
        <VerifiedBadge />
      </div>
      <Stars value={review.stars} />
      <p className="text-[15px] leading-6">{review.text}</p>
    </article>
  );
}

/** Trích dẫn ngắn (trang chủ "Đại lý nói gì"). */
export function ReviewQuote({ review }: { review: Review }) {
  return (
    <figure className="bg-background border-border m-0 grid content-start gap-3 rounded-(--radius-card) border p-6">
      <div className="flex items-center justify-between gap-2">
        <Stars value={review.stars} className="text-base" />
        <VerifiedBadge />
      </div>
      <blockquote className="m-0 text-[15px] leading-6">{review.text}</blockquote>
      <figcaption className="text-muted-foreground text-sm leading-5">
        <strong className="text-foreground font-semibold">{review.who}</strong> · {review.productName}
      </figcaption>
    </figure>
  );
}
