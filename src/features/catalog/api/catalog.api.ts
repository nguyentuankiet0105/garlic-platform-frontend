import type { AgentTier } from "@/features/agents";
import { env } from "@/shared/config/env";
import type { HttpClient } from "@/shared/lib/api/http";
import { ApiError } from "@/shared/lib/api/errors";
import type { Paginated } from "@/shared/types/api";
import type { PackUnit, Product, ProductCategory, ProductOrigin, ProductSort } from "../types";
import { DEFAULT_PAGE_SIZE, mockCategoryCounts, mockGetProduct, mockListProducts } from "./catalog.mock";

export interface ProductQuery {
  q?: string;
  category?: ProductCategory;
  origin?: ProductOrigin;
  pack?: PackUnit;
  inStock?: boolean;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

export interface CatalogViewer {
  /**
   * Chỉ dùng cho MOCK để mô phỏng việc backend gắn giá theo cấp. Với backend thật, giá do Catalog service
   * quyết định từ token trong cookie — client không bao giờ tự yêu cầu giá của cấp khác.
   */
  tier?: AgentTier;
}

/**
 * Factory nhận HttpClient → dùng được ở server component (serverHttp) lẫn React Query (browserHttp).
 * Khi USE_MOCKS=true trả seed; khi Catalog service (Django :8000) xong chỉ cần tắt cờ, không sửa UI.
 */
export function createCatalogApi(http: HttpClient, viewer: CatalogViewer = {}) {
  return {
    listProducts: (query: ProductQuery = {}): Promise<Paginated<Product>> =>
      env.USE_MOCKS
        ? mockListProducts(query, viewer.tier)
        : http.get("/products", { query: { ...query, pageSize: query.pageSize ?? DEFAULT_PAGE_SIZE } }),

    getProduct: async (slug: string): Promise<Product | null> => {
      if (env.USE_MOCKS) return mockGetProduct(slug, viewer.tier);
      try {
        return await http.get<Product>(`/products/${slug}`);
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) return null;
        throw e;
      }
    },

    // TODO(backend): endpoint facets chưa có — thống nhất với Catalog service (hoặc tính từ list khi danh mục nhỏ).
    categoryCounts: (q?: string): Promise<Record<ProductCategory | "all", number>> =>
      env.USE_MOCKS ? mockCategoryCounts(q) : http.get("/products/facets", { query: { q } }),
  };
}

export type CatalogApi = ReturnType<typeof createCatalogApi>;
