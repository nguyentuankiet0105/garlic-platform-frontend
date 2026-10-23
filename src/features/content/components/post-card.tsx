import { formatDate } from "@/shared/lib/format";
import { Badge } from "@/shared/ui";
import type { Post } from "../types";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-border bg-card grid gap-2 rounded-(--radius-card) border p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={post.kind === "review" ? "garlic" : "brand"}>
          {post.kind === "review" ? "Review" : "Hướng dẫn"}
        </Badge>
        {post.verifiedPurchase && <Badge tone="success">Đã mua hàng</Badge>}
      </div>
      <h3 className="font-semibold tracking-tight">{post.title}</h3>
      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
      <p className="text-muted-foreground mt-1 text-xs">
        {post.author} · {formatDate(post.publishedAt)} · {post.readingMinutes} phút đọc
      </p>
    </article>
  );
}
