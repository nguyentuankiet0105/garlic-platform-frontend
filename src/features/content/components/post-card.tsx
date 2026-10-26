import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { formatDate } from "@/shared/lib/format";
import { ImagePlaceholder, Overline } from "@/shared/ui";
import type { Post } from "../types";

/** Thẻ bài viết kiểu tạp chí: ảnh bìa 16:10, nhãn chủ đề, tiêu đề serif, dòng meta. */
export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col gap-3.5">
      <ImagePlaceholder
        label={`Ảnh bìa: ${post.title}`}
        caption="Ảnh bìa"
        iconSize={36}
        className="aspect-[16/10] rounded-(--radius-card)"
      />
      <Overline>{post.tag}</Overline>
      <h3 className="font-display text-[22px] leading-[30px] font-semibold">
        <Link
          href={ROUTES.storefront.guide(post.slug)}
          className="text-foreground group-hover:text-primary no-underline after:absolute after:inset-0"
        >
          {post.title}
        </Link>
      </h3>
      <p className="text-muted-foreground text-sm leading-5">
        {post.kind === "review" ? "Review" : "Hướng dẫn"} · {post.author} · {formatDate(post.publishedAt)} ·{" "}
        {post.readingMinutes} phút đọc
      </p>
    </article>
  );
}
