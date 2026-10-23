import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "border-border bg-card placeholder:text-muted-foreground h-10 w-full rounded-xl border px-3 text-sm",
        "focus-visible:border-primary focus-visible:ring-ring/30 transition-colors focus-visible:ring-2 focus-visible:outline-none",
        "aria-[invalid=true]:border-danger-600",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium", className)} {...props} />;
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-danger-600 mt-1 text-xs">
      {message}
    </p>
  );
}
