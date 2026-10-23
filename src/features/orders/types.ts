export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPING" | "DELIVERED" | "CANCELLED";

export interface OrderLine {
  productId: string;
  name: string;
  qtyKg: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  code: string;
  status: OrderStatus;
  lines: OrderLine[];
  total: number;
  createdAt: string;
}
