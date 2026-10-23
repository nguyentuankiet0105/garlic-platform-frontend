import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Giữ default ổn định: tắt cacheComponents / partialPrefetching của scaffold
  // để layout có thể đọc cookie/session mà không phải bọc Suspense từng chỗ.
  // Bật lại khi bắt đầu tối ưu caching cho Storefront.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
