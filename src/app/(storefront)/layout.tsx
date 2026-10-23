import type { ReactNode } from "react";
import { StorefrontFooter } from "@/zones/storefront/components/storefront-footer";
import { StorefrontHeader } from "@/zones/storefront/components/storefront-header";

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <StorefrontHeader />
      <main>{children}</main>
      <StorefrontFooter />
    </>
  );
}
