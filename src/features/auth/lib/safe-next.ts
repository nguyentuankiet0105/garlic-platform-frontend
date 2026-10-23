/** Chỉ cho phép redirect nội bộ — chặn open-redirect kiểu ?next=//evil.com */
export function safeNext(value: string | undefined): string | undefined {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return undefined;
  return value;
}
