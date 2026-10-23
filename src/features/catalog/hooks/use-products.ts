"use client";

import { useQuery } from "@tanstack/react-query";
import { browserHttp } from "@/shared/lib/api/client";
import { createCatalogApi, type ProductQuery } from "../api/catalog.api";

const api = createCatalogApi(browserHttp("catalog"));

/** Query keys tập trung để invalidate chính xác sau mutation. */
export const catalogKeys = {
  all: ["catalog"] as const,
  list: (q: ProductQuery) => [...catalogKeys.all, "list", q] as const,
  detail: (slug: string) => [...catalogKeys.all, "detail", slug] as const,
};

export const useProducts = (q: ProductQuery = {}) =>
  useQuery({ queryKey: catalogKeys.list(q), queryFn: () => api.listProducts(q) });
