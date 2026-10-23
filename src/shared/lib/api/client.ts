import type { ServiceName } from "@/shared/config/env";
import { createHttpClient, type HttpClient } from "./http";

/**
 * HTTP client cho BROWSER. Không gọi thẳng service (token nằm trong httpOnly cookie,
 * JS không đọc được) mà đi qua BFF: /api/bff/<service>/<path> → route handler gắn Bearer.
 */
export function browserHttp(service: ServiceName): HttpClient {
  return createHttpClient(`/api/bff/${service}`);
}
