/** Tên cookie phiên. Đặt ở shared để cả BFF, proxy.ts và features/auth dùng chung mà không import chéo layer. */
export const ACCESS_COOKIE = "gh_access";
export const REFRESH_COOKIE = "gh_refresh";
