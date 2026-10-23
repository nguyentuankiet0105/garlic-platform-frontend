import { env } from "@/shared/config/env";
import type { HttpClient } from "@/shared/lib/api/http";
import type { Post, PostKind } from "../types";
import { SEED_POSTS } from "./content.mock";

/** Content là Django app riêng bên trong Catalog service → dùng chung base URL "catalog", prefix /content. */
export function createContentApi(http: HttpClient) {
  return {
    listPosts: async (kind?: PostKind): Promise<Post[]> =>
      env.USE_MOCKS
        ? SEED_POSTS.filter((p) => !kind || p.kind === kind)
        : http.get("/content/posts", { query: { kind } }),
  };
}
