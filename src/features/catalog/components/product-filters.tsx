"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/shared/lib/cn";
import { Checkbox } from "@/shared/ui";
import {
  CATEGORY_LABEL,
  ORIGIN_LABEL,
  PACK_UNITS,
  SORT_LABEL,
  type ProductCategory,
  type ProductOrigin,
  type ProductSort,
} from "../types";

type Counts = Record<ProductCategory | "all", number>;

const CATEGORIES = Object.keys(CATEGORY_LABEL) as ProductCategory[];
const ORIGINS = Object.keys(ORIGIN_LABEL) as ProductOrigin[];

/** Cập nhật 1 tham số trong URL, luôn về trang 1. URL là nguồn sự thật → chia sẻ/refresh/back đều đúng. */
function useUrlParam() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    const qs = next.toString();
    start(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };
  return { params, set, pending };
}

export function ProductFilters({ counts }: { counts: Counts }) {
  const { params, set, pending } = useUrlParam();
  const category = params.get("category");
  const origin = params.get("origin");
  const pack = params.get("pack");
  const inStock = params.get("instock") === "1";

  return (
    <aside aria-label="Bộ lọc" aria-busy={pending} className={cn("grid content-start gap-6", pending && "opacity-70")}>
      <fieldset className="grid gap-1.5">
        <legend className="mb-1.5 text-sm font-bold">Danh mục</legend>
        {(["all", ...CATEGORIES] as const).map((id) => {
          const on = id === "all" ? !category : category === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => set("category", id === "all" ? null : id)}
              className={cn(
                "flex min-h-11 items-center justify-between rounded-[10px] border px-3 text-left text-sm font-medium",
                on
                  ? "border-primary bg-primary-soft text-primary-soft-foreground font-semibold"
                  : "text-foreground hover:bg-muted border-transparent",
              )}
            >
              {id === "all" ? "Tất cả" : CATEGORY_LABEL[id]}
              <span className="text-muted-foreground text-[13px]">{counts[id]}</span>
            </button>
          );
        })}
      </fieldset>

      <fieldset className="grid gap-1">
        <legend className="mb-1.5 text-sm font-bold">Quy cách</legend>
        {PACK_UNITS.map((u) => (
          <label key={u} className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm">
            <Checkbox checked={pack === u} onChange={(e) => set("pack", e.target.checked ? u : null)} />
            {u === "bao" ? "Bao (10kg, 25kg)" : "Thùng (5kg, 12 hũ)"}
          </label>
        ))}
      </fieldset>

      <fieldset className="grid gap-1">
        <legend className="mb-1.5 text-sm font-bold">Vùng trồng</legend>
        {ORIGINS.map((o) => (
          <label key={o} className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm">
            <Checkbox checked={origin === o} onChange={(e) => set("origin", e.target.checked ? o : null)} />
            {ORIGIN_LABEL[o]}
          </label>
        ))}
      </fieldset>

      <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm font-medium">
        <Checkbox checked={inStock} onChange={(e) => set("instock", e.target.checked ? "1" : null)} />
        Chỉ hàng còn sẵn
      </label>
    </aside>
  );
}

export function ProductSortSelect({ value }: { value: ProductSort }) {
  const { set } = useUrlParam();
  return (
    <div className="flex items-center gap-2.5">
      <label htmlFor="pl-sort" className="text-muted-foreground text-sm">
        Sắp xếp
      </label>
      <select
        id="pl-sort"
        value={value}
        onChange={(e) => set("sort", e.target.value === "popular" ? null : e.target.value)}
        className="border-border-strong bg-card focus:border-primary focus:ring-ring-soft h-11 rounded-[10px] border px-3 text-[15px] outline-none focus:ring-[3px]"
      >
        {(Object.keys(SORT_LABEL) as ProductSort[]).map((s) => (
          <option key={s} value={s}>
            {SORT_LABEL[s]}
          </option>
        ))}
      </select>
    </div>
  );
}
