"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";
import { EmptyState, Stars } from "@/shared/ui";
import { MessageSquareOff } from "lucide-react";
import type { Review } from "../types";
import { ReviewCard } from "./review-card";

type Filter = "all" | "5" | "4" | "photo";
const CHIPS: [Filter, string][] = [
  ["all", "Tất cả"],
  ["5", "5 sao"],
  ["4", "4 sao"],
  ["photo", "Có ảnh"],
];

export interface RatingSummaryProps {
  average: number;
  count: number;
  /** [5★, 4★, 3★, 2★, 1★] */
  distribution: number[];
}

/** Tổng quan điểm + phân bố sao + lọc chip. Lọc phía client trên danh sách đã tải (đủ cho vài chục đánh giá). */
export function ReviewSection({ summary, reviews }: { summary: RatingSummaryProps | null; reviews: Review[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = reviews.filter((r) => filter === "all" || (filter === "photo" ? r.hasPhoto : String(r.stars) === filter));

  if (!summary) {
    return (
      <EmptyState
        icon={MessageSquareOff}
        title="Chưa có đánh giá"
        description="Đánh giá xuất hiện sau khi đại lý đã nhận hàng viết nhận xét."
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="border-border bg-card grid content-start gap-3 rounded-(--radius-card) border p-5">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-5xl leading-none font-semibold">{summary.average}</span>
          <span className="text-muted-foreground text-sm">/ 5 · {summary.count} đánh giá</span>
        </div>
        <Stars value={summary.average} />
        <ul className="grid gap-2">
          {summary.distribution.map((n, i) => (
            <li key={i} className="flex items-center gap-2 text-[13px]">
              <span className="w-6">{5 - i}★</span>
              <span className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                <span
                  className="bg-primary block h-full rounded-full"
                  style={{ width: `${summary.count ? Math.round((n / summary.count) * 100) : 0}%` }}
                />
              </span>
              <span className="text-muted-foreground w-6 text-right">{n}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid content-start gap-4">
        <div role="group" aria-label="Lọc đánh giá" className="flex flex-wrap gap-2">
          {CHIPS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={cn(
                "h-11 rounded-full border px-4 text-sm font-medium",
                filter === id
                  ? "border-primary bg-primary-soft text-primary-soft-foreground font-semibold"
                  : "border-border-strong bg-card",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        {shown.length ? (
          shown.map((r) => <ReviewCard key={r.id} review={r} />)
        ) : (
          <EmptyState
            icon={MessageSquareOff}
            title="Chưa có đánh giá phù hợp bộ lọc"
            description="Thử chọn “Tất cả”."
            action={
              <button type="button" onClick={() => setFilter("all")} className="text-primary text-sm font-semibold underline">
                Xem tất cả đánh giá
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
