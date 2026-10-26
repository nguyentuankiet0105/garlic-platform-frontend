import { Button } from "@/shared/ui";

/** SSO Google chưa làm (Auth service đã thiết kế, hoãn) → nút khoá, ghi rõ "sắp có". */
export function GoogleSoonButton({ label }: { label: string }) {
  return (
    <Button type="button" variant="outline" size="lg" disabled className="w-full gap-2.5">
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M21.35 11.1H12v2.9h5.35c-.5 2.4-2.5 3.6-5.35 3.6a6 6 0 1 1 0-12c1.5 0 2.8.55 3.85 1.45l2.1-2.1A9 9 0 1 0 12 21c5 0 8.6-3.5 8.6-8.4 0-.5-.05-1-.15-1.5z" />
      </svg>
      {label} · sắp có
    </Button>
  );
}

export function OrDivider({ children = "hoặc" }: { children?: string }) {
  return (
    <div className="text-muted-foreground flex items-center gap-3 text-[13px]" role="separator">
      <span className="bg-border h-px flex-1" />
      {children}
      <span className="bg-border h-px flex-1" />
    </div>
  );
}
