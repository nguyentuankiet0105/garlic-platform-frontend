import "server-only";
import { cookies } from "next/headers";
import { env, type ServiceName } from "@/shared/config/env";
import { ACCESS_COOKIE } from "@/shared/config/cookies";
import { createHttpClient, type HttpClient } from "./http";

/** HTTP client cho SERVER (server component, route handler): gọi thẳng service, gắn Bearer từ cookie. */
export function serverHttp(service: ServiceName): HttpClient {
  return createHttpClient(env.services[service], async (): Promise<Record<string, string>> => {
    const token = (await cookies()).get(ACCESS_COOKIE)?.value;
    return token ? { Authorization: `Bearer ${token}` } : {};
  });
}
