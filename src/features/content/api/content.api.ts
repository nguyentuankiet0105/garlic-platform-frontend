import { env } from "@/shared/config/env";
import type { HttpClient } from "@/shared/lib/api/http";
import type { Post, PostKind, Review } from "../types";
import { SEED_POSTS, SEED_REVIEWS } from "./content.mock";

/** Content là Django app riêng bên trong Catalog service → dùng chung base URL "catalog", prefix /content. */
export function createContentApi(http: HttpClient) {
  return {
    listPosts: async (kind?: PostKind): Promise<Post[]> =>
      env.USE_MOCKS
        ? SEED_POSTS.filter((p) => !kind || p.kind === kind)
        : http.get("/content/posts", { query: { kind } }),

    /** Bài hướng dẫn liên quan tới 1 sản phẩm (tham chiếu mềm theo slug). */
    listPostsForProduct: async (productSlug: string): Promise<Post[]> =>
      env.USE_MOCKS
        ? SEED_POSTS.filter((p) => p.productSlug === productSlug)
        : http.get("/content/posts", { query: { product: productSlug } }),

    /** Đánh giá công khai; bỏ `productSlug` để lấy đánh giá nổi bật toàn shop (trang chủ). */
    listReviews: async (productSlug?: string): Promise<Review[]> =>
      env.USE_MOCKS
        ? SEED_REVIEWS.filter((r) => !productSlug || r.productSlug === productSlug)
        : http.get("/content/reviews", { query: { product: productSlug } }),
  };
}
