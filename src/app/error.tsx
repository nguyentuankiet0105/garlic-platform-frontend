"use client";

import { Button } from "@/shared/ui";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <div className="grid max-w-md justify-items-center gap-4">
        <h1 className="text-2xl font-semibold">Có lỗi xảy ra</h1>
        <p className="text-muted-foreground text-sm">{error.message || "Vui lòng thử lại sau."}</p>
        <Button onClick={reset}>Thử lại</Button>
      </div>
    </main>
  );
}
