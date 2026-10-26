# Garlic Hub — Frontend Architecture

Next.js 16 (App Router) · TypeScript · Tailwind v4 (theme "Tỏi Mộc") · TanStack Query · react-hook-form + zod

## 1. Bức tranh tổng thể

```
                     Browser
                        │   (không bao giờ thấy token — httpOnly cookie)
                        ▼
 ┌──────────────────────────────────────────────────────────────┐
 │  proxy.ts  ── chặn sớm /portal, /admin theo cookie           │
 ├──────────────────────────────────────────────────────────────┤
 │  src/app  (ROUTING MỎNG — chỉ ghép layout + feature)         │
 │   (storefront)   (auth)     (agent)/portal    (admin)/admin  │
 │   public, SEO    login      role AGENT        ADMIN | STAFF  │
 │        └────────────┴────────────┴────────────────┘          │
 │  api/auth/*  ← BFF: login/logout, set cookie httpOnly        │
 │  api/bff/[service]/*  ← BFF forwarder: gắn Bearer, chuyển tiếp│
 └───────────────┬──────────────────────────────┬───────────────┘
                 │ import                        │ server fetch (Bearer từ cookie)
                 ▼                               ▼
   zones/ (shell + nav theo zone)      ┌──────────────────────────┐
        │                              │ Auth & Admin  NestJS :3000│
        ▼                              │ Catalog&Order Django :8000│
   features/ (miền nghiệp vụ)  ───────▶│ Agent&Payment FastAPI:8001│
        │                              └──────────────────────────┘
        ▼
   shared/ (ui, lib/api, config, providers)
```

## 2. Quy tắc phân tầng (ESLint ép buộc — `eslint.config.mjs`)

`app → zones → features → shared`: chỉ được import **xuống dưới**.

| Tầng | Chứa gì | Không được |
|---|---|---|
| `shared/` | UI primitives, http client, env, routes, format | import features/zones/app |
| `features/<domain>/` | types, api, hooks, schemas, components của 1 miền | import zones/app; import sâu vào feature khác (chỉ qua `index.ts`) |
| `zones/<zone>/` | nav config + component riêng của zone | import app; import zone khác |
| `app/` | route, layout, page — ghép các tầng trên | chứa logic nghiệp vụ |

Mỗi feature có **public API = `index.ts`** (an toàn cho client) và **`server.ts`** (chỉ server: `next/headers`, `server-only`). Tách 2 file để không kéo code server vào client bundle.

## 3. Folder structure

```
src/
├─ app/
│  ├─ layout.tsx · globals.css (design tokens Tỏi Mộc) · error.tsx · not-found.tsx
│  ├─ (storefront)/   /  /products  /products/[slug]  /guides  /guides/[slug]  /become-agent
│  ├─ (auth)/login
│  ├─ (agent)/portal/  catalog · cart · orders[/id] · reorder · debt · pricing · account
│  ├─ (admin)/admin/   agents · products · orders · content · users · settings
│  ├─ pending-approval/
│  └─ api/  auth/{login,logout}  ·  bff/[service]/[...path]
├─ zones/{storefront,agent,admin,auth}/  components/ · config/nav.ts
├─ features/
│  ├─ auth/      types · lib(jwt, safe-next, mock-accounts) · server(session, guards) · api · hooks · schemas · components
│  ├─ catalog/   types · api(factory + mock + server) · hooks · components(ProductCard…)
│  ├─ content/   Reviews & blog (Django app riêng, chỉ tham chiếu productSlug)
│  ├─ orders/ · agents/ · cart/   (khung: types + api factory — implement ở bước sau)
├─ shared/
│  ├─ ui/ (button, badge, card, input, logo, stat-card…) · components/ (AppShell, SidebarNav, FeaturePlaceholder)
│  ├─ lib/ (cn, format, api/{http,client,server,errors}) · config/ (env, routes, site, cookies) · providers/ · types/
├─ proxy.ts        (Next 16: đổi tên từ middleware.ts)
└─ test/           (vitest setup)
```

## 4. Quyết định kiến trúc chính

**Modular monolith "zone-ready" (chưa tách micro-frontend).** 3 zone là 3 route group; `zones/` + `features/` + `shared/` có ranh giới rõ nên sau này tách sang **Next.js Multi-Zones** (mỗi zone 1 app, nối bằng `rewrites`) chỉ là di chuyển thư mục: `app/(agent)` + `zones/agent` + các feature nó dùng → app mới; `shared/` thành package chung. Chưa chọn Module Federation — quyết định này còn treo.

**BFF + cookie httpOnly.** Access/refresh token không nằm trong JS (chống XSS lấy token). Browser chỉ gọi `/api/auth/*` và `/api/bff/<service>/*`; handler gắn `Authorization: Bearer`. Server component gọi thẳng service qua `serverHttp()`. Hệ quả: CORS không cần bật ở các backend.

**Feature API = factory nhận `HttpClient`.** `createCatalogApi(http)` chạy được cả server (`serverHttp`) lẫn React Query (`browserHttp`). `USE_MOCKS=true` trả seed → tắt cờ khi backend xong, UI không đổi.

**3 lớp bảo vệ route:** `proxy.ts` (edge, nhanh, chỉ giải mã payload) → `requireRole()` trong layout (role + status) → backend (nguồn sự thật, verify chữ ký).

**Design tokens 2 lớp** (`globals.css`): palette thô (`brand` xanh lá, `garlic` đất nung, `tier-*` Đồng/Bạc/Vàng, `success/warning/danger/info`) → token ngữ nghĩa (`background`, `primary`, `card`, `border`, `sidebar`…). Component chỉ dùng lớp ngữ nghĩa → đổi theme không sửa component; Phông: Be Vietnam Pro (UI) + Lora (tiêu đề, `font-display`) qua `next/font`. Design light-first; dark mode mới chỉnh một phần — các nền trạng thái (Alert, chip cấp) là màu sáng cố định với chữ tối.

**Giá theo người xem (`ViewerKind`: guest · pending · agent).** Khách và đại lý chờ duyệt KHÔNG nhận giá: server component chỉ truyền `tier` cho catalog khi `getViewer()` trả `agent`, và `Product.price` không tồn tại với hai nhóm còn lại → UI không có gì để lộ (có test). Với backend thật, Catalog service quyết định giá từ token trong cookie; `tier` chỉ phục vụ mock.

**Màn xác thực.** `(auth)`: login (chia đôi), become-agent (đăng ký), forgot-password, reset-password; `pending-approval` có 3 trạng thái theo `session.status` (PENDING/ACTIVE/REJECTED). Đăng ký thật chưa nối được (Agent service chưa có) → BFF `/api/auth/register` chỉ chạy ở mock.

## 5. Việc cần backend (lệch so với frontend)

| Frontend cần | Auth service hiện tại |
|---|---|
| Role `ADMIN` / `STAFF` / `AGENT` | `ADMIN` / `AUTHOR` / `USER` → cần migration + đổi enum |
| Claim `status` (`PENDING`/`ACTIVE`/`SUSPENDED`) trong JWT | chưa có (FE tạm mặc định `ACTIVE`) |
| Endpoint đăng ký đại lý, duyệt đại lý | chưa có |

## 6. Chạy

```bash
cp .env.example .env.local     # mặc định USE_MOCKS=true
npm install && npm run dev     # http://localhost:3001
# Demo: admin@demo.vn · staff@demo.vn · agent@demo.vn (Vàng) · pending@demo.vn · rejected@demo.vn · locked@demo.vn (403) · throttle@demo.vn (429) (mật khẩu bất kỳ ≥ 6 ký tự). Đặt lại mật khẩu: token `demo` hợp lệ, `expired` hết hạn
npm run typecheck && npm run lint && npm test && npm run build
```

Nối Auth service thật: `NEXT_PUBLIC_USE_MOCKS=false`, `AUTH_API_URL=http://<EC2-IP>:3000` (hoặc domain). Biến `NEXT_PUBLIC_*` bị nướng lúc build — đổi xong phải build lại.
