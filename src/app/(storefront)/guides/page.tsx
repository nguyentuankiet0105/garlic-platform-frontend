import type { Metadata } from "next";
import { PostCard, createContentApi } from "@/features/content";
import { serverHttp } from "@/shared/lib/api/server";
import { Container, PageHeader } from "@/shared/ui";

export const metadata: Metadata = { title: "Hướng dẫn & review" };

export default async function GuidesPage() {
  const posts = await createContentApi(serverHttp("catalog")).listPosts();
  return (
    <Container className="py-12">
      <PageHeader
        title="Hướng dẫn & review"
        description="Kinh nghiệm bảo quản, nhập hàng và đánh giá thực tế từ đại lý."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </Container>
  );
}
