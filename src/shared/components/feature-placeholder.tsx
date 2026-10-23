import { Badge, Card, CardContent, CardHeader, CardTitle, PageHeader } from "@/shared/ui";

/**
 * Trang khung cho màn hình chưa implement. Mỗi trang khai báo rõ:
 * service nào sở hữu dữ liệu + danh sách việc sẽ làm → vừa là roadmap vừa là bản đồ kiến trúc.
 */
export function FeaturePlaceholder({
  title,
  description,
  service,
  planned,
}: {
  title: string;
  description: string;
  service: string;
  planned: string[];
}) {
  return (
    <>
      <PageHeader title={title} description={description} actions={<Badge tone="garlic">Sắp làm</Badge>} />
      <Card>
        <CardHeader>
          <CardTitle>Dữ liệu từ: {service}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-muted-foreground grid gap-2 text-sm sm:grid-cols-2">
            {planned.map((item) => (
              <li key={item} className="bg-muted/60 flex items-start gap-2 rounded-lg px-3 py-2">
                <span className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
