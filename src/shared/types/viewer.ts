/**
 * Người đang xem storefront. Quyết định hiển thị giá:
 *  - guest   : chưa đăng nhập (hoặc admin/staff) → KHÔNG thấy giá
 *  - pending : đại lý chờ duyệt → KHÔNG thấy giá
 *  - agent   : đại lý đã duyệt → thấy giá theo cấp
 */
export type ViewerKind = "guest" | "pending" | "agent";
