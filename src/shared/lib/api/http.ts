import { ApiError, extractMessage } from "./errors";

export interface RequestOptions {
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  /** Chỉ có tác dụng khi gọi từ server (Next fetch cache). */
  next?: { revalidate?: number | false; tags?: string[] };
}

/**
 * Giao diện HTTP mà feature API dùng. Có 2 hiện thực:
 *  - browserHttp (client.ts): gọi qua BFF /api/bff/<service>, token nằm trong httpOnly cookie
 *  - serverHttp  (server.ts): gọi thẳng service, tự gắn Bearer từ cookie
 * Feature API chỉ biết interface này → dùng được ở cả server component lẫn React Query.
 */
export interface HttpClient {
  get<T>(path: string, opts?: RequestOptions): Promise<T>;
  post<T>(path: string, body?: unknown, opts?: RequestOptions): Promise<T>;
  patch<T>(path: string, body?: unknown, opts?: RequestOptions): Promise<T>;
  put<T>(path: string, body?: unknown, opts?: RequestOptions): Promise<T>;
  delete<T>(path: string, opts?: RequestOptions): Promise<T>;
}

function buildUrl(base: string, path: string, query?: RequestOptions["query"]) {
  const url = base.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
  if (!query) return url;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) if (v !== undefined && v !== "") sp.set(k, String(v));
  const qs = sp.toString();
  return qs ? `${url}?${qs}` : url;
}

export function createHttpClient(
  baseUrl: string,
  getHeaders?: () => Promise<Record<string, string>> | Record<string, string>,
): HttpClient {
  async function request<T>(method: string, path: string, opts: RequestOptions = {}): Promise<T> {
    const extra = (await getHeaders?.()) ?? {};
    const res = await fetch(buildUrl(baseUrl, path, opts.query), {
      method,
      headers: {
        Accept: "application/json",
        ...(opts.body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...extra,
        ...opts.headers,
      },
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
      ...(opts.next ? { next: opts.next } : {}),
    });

    if (res.status === 204) return undefined as T;
    const text = await res.text();
    const data = text ? safeJson(text) : undefined;

    if (!res.ok) {
      const { message, code } = extractMessage(data, res.statusText || "Request failed");
      throw new ApiError(res.status, message, code, data);
    }
    return data as T;
  }

  return {
    get: (p, o) => request("GET", p, o),
    post: (p, body, o) => request("POST", p, { ...o, body }),
    patch: (p, body, o) => request("PATCH", p, { ...o, body }),
    put: (p, body, o) => request("PUT", p, { ...o, body }),
    delete: (p, o) => request("DELETE", p, o),
  };
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
