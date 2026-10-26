"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { formatVnd } from "@/shared/lib/format";
import { Alert, Button } from "@/shared/ui";
import { clampQty } from "../lib/pricing";
import type { PackUnit } from "../types";

interface Props {
  productName: string;
  packUnit: PackUnit;
  packLabel: string;
  minPacks: number;
  packStep: number;
  unitPrice: number;
  disabled?: boolean;
}

/** Bộ chọn số lượng theo bội số quy cách + tạm tính. Giỏ hàng thật nằm ở phase Portal (chưa kết nối). */
export function AddToCart({ productName, packUnit, packLabel, minPacks, packStep, unitPrice, disabled }: Props) {
  const rule = { minPacks, packStep };
  const [qty, setQty] = useState(() => clampQty(rule, minPacks));
  const [added, setAdded] = useState<number | null>(null);
  const stepBtn =
    "border-border-strong bg-card hover:bg-muted grid size-11 place-items-center rounded-[10px] border disabled:opacity-40";

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold">Số lượng</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={stepBtn}
            disabled={qty <= minPacks}
            onClick={() => setQty((q) => clampQty(rule, q - packStep))}
            aria-label={`Giảm ${packStep} ${packUnit}`}
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <span role="status" aria-label={`Số ${packUnit}`} className="min-w-10 text-center text-lg font-bold">
            {qty}
          </span>
          <button
            type="button"
            className={stepBtn}
            onClick={() => setQty((q) => clampQty(rule, q + packStep))}
            aria-label={`Tăng ${packStep} ${packUnit}`}
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
        <span className="text-muted-foreground text-[13px]">
          {packLabel.toLowerCase()}
          {packStep > 1 ? ` · bội số ${packStep}` : ""}, tối thiểu {minPacks}
        </span>
      </div>

      <dl className="border-border flex items-baseline justify-between rounded-[10px] border border-dashed px-4 py-3 text-sm">
        <dt className="text-muted-foreground">Tạm tính</dt>
        <dd className="text-lg font-bold">{formatVnd(qty * unitPrice)}</dd>
      </dl>

      <Button size="lg" disabled={disabled} onClick={() => setAdded(qty)}>
        Thêm vào giỏ
      </Button>
      {added !== null && (
        <Alert tone="info">
          Giỏ hàng chưa được kết nối (thuộc phase Cổng đại lý) nên {added} {packUnit} {productName} chưa được lưu.
        </Alert>
      )}
    </div>
  );
}
