import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { env, type ServiceName } from "@/shared/config/env";
import { ACCESS_COOKIE } from "@/shared/config/cookies";

/**
 * BFF forwarder: browser gọi /api/bff/<service>/<path>, handler này gắn Bearer từ cookie httpOnly
 * rồi chuyển tiếp tới đúng service. Một cổng duy nhất → sau này thêm refresh-on-401, logging,
 * rate limit, hoặc đổi sang API Gateway thật mà không sửa code feature.
 *
 * TODO(refresh): khi nhận 401 → gọi /auth/refresh bằng refresh cookie, set lại cookie, retry 1 lần.
 */
async function forward(req: NextRequest, ctx: { params: Promise<{ service: string; path: string[] }> }) {
  const { service, path } = await ctx.params;
  if (!(service in env.services)) return NextResponse.json({ message: "Unknown service" }, { status: 404 });

  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  const target = new URL(`${env.services[service as ServiceName]}/${path.join("/")}`);
  target.search = req.nextUrl.search;

  const hasBody = !["GET", "HEAD"].includes(req.method);
  const upstream = await fetch(target, {
    method: req.method,
    headers: {
      Accept: "application/json",
      ...(hasBody ? { "Content-Type": req.headers.get("content-type") ?? "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: hasBody ? await req.text() : undefined,
    cache: "no-store",
  }).catch(() => null);

  if (!upstream) return NextResponse.json({ message: "Service unavailable" }, { status: 502 });

  return new NextResponse(upstream.status === 204 ? null : await upstream.text(), {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
  });
}

export { forward as GET, forward as POST, forward as PUT, forward as PATCH, forward as DELETE };
