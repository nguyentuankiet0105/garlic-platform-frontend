import type { ReactNode } from "react";
import { FieldError, FieldHint, Label, Required } from "./input";

/** aria-describedby cho control trong <Field>: trỏ tới gợi ý và/hoặc lỗi đang hiển thị. */
export function describedBy(id: string, opts: { hint?: boolean; error?: boolean }) {
  const ids = [opts.hint && `${id}-hint`, opts.error && `${id}-err`].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

/** Nhãn + control + gợi ý + lỗi. Control tự gắn id={id} và aria-describedby={describedBy(...)}. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  action,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  /** Liên kết bên phải nhãn (vd. "Quên mật khẩu?"). */
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>
          {label}
          {required && <Required />}
        </Label>
        {action}
      </div>
      {children}
      {hint && !error && <FieldHint id={`${id}-hint`}>{hint}</FieldHint>}
      <FieldError id={`${id}-err`} message={error} />
    </div>
  );
}
