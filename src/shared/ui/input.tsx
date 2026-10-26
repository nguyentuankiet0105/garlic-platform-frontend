import { CircleAlert } from "lucide-react";
import type { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

const control = cn(
  "h-11 w-full rounded-[10px] border border-border-strong bg-card px-3.5 text-[15px] text-foreground",
  "placeholder:text-muted-foreground transition-colors",
  "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring-soft focus-visible:outline-none",
  "aria-[invalid=true]:border-danger-600 disabled:bg-muted disabled:text-muted-foreground",
);

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(control, "px-3", className)} {...props}>
      {children}
    </select>
  );
}

export function Checkbox({ className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return <input type="checkbox" className={cn("accent-primary size-[18px] shrink-0", className)} {...props} />;
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm leading-5 font-medium", className)} {...props} />;
}

/** Dấu * đỏ cho trường bắt buộc (ẩn khỏi screen reader — input đã có `required`/aria). */
export function Required() {
  return (
    <span className="text-danger-600" aria-hidden>
      {" "}
      *
    </span>
  );
}

export function FieldHint({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <span id={id} className="text-muted-foreground text-xs leading-4">
      {children}
    </span>
  );
}

export function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-danger-600 flex items-center gap-1 text-xs leading-4">
      <CircleAlert className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}
