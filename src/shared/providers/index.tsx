import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

/** Gom mọi provider toàn cục ở một chỗ; thêm Toast/Theme... vào đây. */
export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
