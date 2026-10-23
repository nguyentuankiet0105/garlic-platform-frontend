import { env } from "@/shared/config/env";
import type { HttpClient } from "@/shared/lib/api/http";
import { ApiError } from "@/shared/lib/api/errors";
import type { Paginated } from "@/shared/types/api";
import type { Product } from "../types";
import { mockGetProduct, mockListProducts } from "./catalog.mock";

export interface ProductQuery {
  q?: string;
  category?: string;
}

/**
 * Factory nhận HttpClient → dùng được ở server component (serverHttp) lẫn React Query (browserHttp).
 * Khi USE_MOCKS=true trả seed; khi Catalog service (Django :8000) xong chỉ cần tắt cờ, không sửa UI.
 */
export function createCatalogApi(http: HttpClient) {
  return {
    listProducts: (query: ProductQuery = {}): Promise<Paginated<Product>> =>
      env.USE_MOCKS ? mockListProducts(query) : http.get("/products", { query: { ...query } }),

    getProduct: async (slug: string): Promise<Product | null> => {
      if (env.USE_MOCKS) return mockGetProduct(slug);
      try {
        return await http.get<Product>(`/products/${slug}`);
      } catch (e) {
        if (e instanceof ApiError && e.status === 404) return null;
        throw e;
      }
    },
  };
}

export type CatalogApi = ReturnType<typeof createCatalogApi>;
