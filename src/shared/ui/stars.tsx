import { cn } from "@/shared/lib/cn";

/** Sao đánh giá bằng ký tự (không phụ thuộc ảnh). role="img" + nhãn đọc được: "4.8 trên 5 sao". */
export function Stars({ value, className }: { value: number; className?: string }) {
  const full = Math.round(Math.min(5, Math.max(0, value)));
  return (
    <span
      role="img"
      aria-label={`${value} trên 5 sao`}
      className={cn("text-[#8A5A00] tracking-[2px] dark:text-[#E0B050]", className)}
    >
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}
