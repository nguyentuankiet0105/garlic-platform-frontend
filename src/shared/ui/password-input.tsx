"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

/** Ô mật khẩu có nút hiện/ẩn (nút ≥44px, có aria-label + aria-pressed). */
export function PasswordInput({
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  const [visible, setVisible] = useState(false);
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
  return (
    <div
      className={cn(
        "border-border-strong bg-card focus-within:border-primary focus-within:ring-ring-soft flex h-11 items-center overflow-hidden rounded-[10px] border focus-within:ring-[3px]",
        invalid && "border-danger-600",
        className,
      )}
    >
      <input
        type={visible ? "text" : "password"}
        className="text-foreground h-full min-w-0 flex-1 bg-transparent px-3.5 text-[15px] outline-none"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        aria-pressed={visible}
        className="text-muted-foreground hover:text-foreground grid size-11 shrink-0 place-items-center"
      >
        {visible ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
      </button>
    </div>
  );
}
