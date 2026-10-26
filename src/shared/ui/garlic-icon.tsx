import type { SVGProps } from "react";

/** Củ tỏi nét đơn (24px mặc định) — dùng cho logo và ô ảnh giữ chỗ. Màu theo currentColor. */
export function GarlicIcon({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 3v3" />
      <path d="M16 6c-1 3-3 4-5 6-3 2.5-5 5-5 9 0 4.5 4.5 8 10 8s10-3.5 10-8c0-4-2-6.5-5-9-2-2-4-3-5-6z" />
      <path d="M16 9c-2.5 3-3.5 7.5-3 17" />
      <path d="M16 9c2.5 3 3.5 7.5 3 17" />
    </svg>
  );
}
