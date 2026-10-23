/** Nguồn sự thật duy nhất cho đường dẫn. Không hard-code "/portal/..." ở nơi khác. */
export const ROUTES = {
  home: "/",
  login: "/login",
  becomeAgent: "/become-agent",
  pendingApproval: "/pending-approval",

  storefront: {
    products: "/products",
    product: (slug: string) => `/products/${slug}`,
    guides: "/guides",
    guide: (slug: string) => `/guides/${slug}`,
  },

  agent: {
    root: "/portal",
    catalog: "/portal/catalog",
    cart: "/portal/cart",
    orders: "/portal/orders",
    order: (id: string) => `/portal/orders/${id}`,
    reorder: "/portal/reorder",
    debt: "/portal/debt",
    pricing: "/portal/pricing",
    account: "/portal/account",
  },

  admin: {
    root: "/admin",
    agents: "/admin/agents",
    products: "/admin/products",
    orders: "/admin/orders",
    content: "/admin/content",
    users: "/admin/users",
    settings: "/admin/settings",
  },
} as const;

/** Prefix dùng cho proxy.ts và guard. */
export const ZONE_PREFIX = {
  agent: "/portal",
  admin: "/admin",
} as const;
