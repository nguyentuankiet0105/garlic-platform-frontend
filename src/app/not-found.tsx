import { ButtonLink } from "@/shared/ui";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <div className="grid justify-items-center gap-4">
        <span className="text-6xl">🧄</span>
        <h1 className="text-2xl font-semibold">Không tìm thấy trang</h1>
        <p className="text-muted-foreground">Đường dẫn bạn mở không tồn tại hoặc đã được di chuyển.</p>
        <ButtonLink href="/">Về trang chủ</ButtonLink>
      </div>
    </main>
  );
}
