import { cn } from "@/shared/lib/cn";
import { GarlicIcon } from "./garlic-icon";

/**
 * Ô ảnh giữ chỗ cho tới khi có ảnh thật (S3 + CloudFront). role="img" + aria-label để đọc được bằng screen reader.
 * Khi có ảnh, thay bằng next/image trong chính component gọi — không cần đổi layout vì kích thước do className quyết định.
 */
export function ImagePlaceholder({
  label,
  caption,
  iconSize = 44,
  className,
}: {
  label: string;
  caption?: string;
  iconSize?: number;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "bg-placeholder-image text-placeholder-image-foreground flex flex-col items-center justify-center gap-2 text-center",
        className,
      )}
    >
      <GarlicIcon width={iconSize} height={iconSize} strokeWidth={1.4} />
      {caption && <span className="text-xs font-semibold">{caption}</span>}
    </div>
  );
}
