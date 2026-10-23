import type { HttpClient } from "@/shared/lib/api/http";
import type { Paginated } from "@/shared/types/api";
import type { Order } from "../types";

/** Order thuộc Catalog & Order service (Django :8000). Tạo đơn sẽ gọi sync sang Agent service để check giá/hạn mức. */
export function createOrdersApi(http: HttpClient) {
  return {
    list: () => http.get<Paginated<Order>>("/orders"),
    get: (id: string) => http.get<Order>(`/orders/${id}`),
    // TODO: create(cart) → 409 CREDIT_LIMIT_EXCEEDED khi vượt hạn mức
  };
}
