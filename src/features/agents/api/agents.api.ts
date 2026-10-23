import type { HttpClient } from "@/shared/lib/api/http";
import type { AgentProfile } from "../types";

/** Agent service (FastAPI :8001): cấp đại lý, bảng giá sỉ, hạn mức công nợ, thanh toán. */
export function createAgentsApi(http: HttpClient) {
  return {
    me: () => http.get<AgentProfile>("/agents/me"),
    // TODO: listPriceTiers, listDebt, createPaymentIntent, listReorderItems...
  };
}
