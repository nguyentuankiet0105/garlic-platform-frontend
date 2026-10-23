/** Lỗi chuẩn hoá cho mọi lời gọi API (NestJS / DRF / FastAPI trả format khác nhau). */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isUnauthorized() {
    return this.status === 401;
  }
  get isForbidden() {
    return this.status === 403;
  }
}

/** Mỗi framework giấu message ở một chỗ khác nhau — gom về một nơi. */
export function extractMessage(body: unknown, fallback: string): { message: string; code?: string } {
  if (body && typeof body === "object") {
    const b = body as Record<string, unknown>;
    // NestJS: { message: string | string[], error } — DRF: { detail } — FastAPI: { detail }
    const raw = b.message ?? b.detail ?? b.error;
    const message = Array.isArray(raw) ? raw.join(", ") : typeof raw === "string" ? raw : fallback;
    return { message, code: typeof b.code === "string" ? b.code : undefined };
  }
  return { message: fallback };
}
