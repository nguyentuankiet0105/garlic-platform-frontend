import { ImagePlaceholder } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

/** Ảnh sản phẩm tạm. Khi có ảnh thật (S3/CloudFront) thay phần ruột bằng next/image, giữ nguyên khung. */
export function ProductImage({ name, className, iconSize }: { name: string; className?: string; iconSize?: number }) {
  return (
    <ImagePlaceholder
      label={`Ảnh sản phẩm: ${name}`}
      caption="Ảnh sản phẩm"
      iconSize={iconSize}
      className={cn("h-[200px]", className)}
    />
  );
}
