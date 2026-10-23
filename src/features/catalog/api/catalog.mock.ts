import type { Paginated } from "@/shared/types/api";
import type { Product } from "../types";

export const SEED_PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "toi-co-don-ly-son",
    name: "Tỏi cô đơn Lý Sơn",
    category: "fresh",
    origin: "Lý Sơn, Quảng Ngãi",
    listPricePerKg: 185_000,
    minOrderKg: 20,
    stockKg: 1200,
    summary: "Củ một nhánh, vị cay đậm, thơm nồng — hàng tuyển loại 1.",
    description: "Tỏi cô đơn Lý Sơn trồng trên đất cát pha núi lửa, phơi nắng tự nhiên, đóng gói túi lưới 5kg.",
    tags: ["đặc sản", "loại 1"],
  },
  {
    id: "p2",
    slug: "toi-kho-cu-lon",
    name: "Tỏi khô củ lớn",
    category: "dried",
    origin: "Ninh Thuận",
    listPricePerKg: 62_000,
    minOrderKg: 50,
    stockKg: 8000,
    summary: "Củ đều, khô ráo, bảo quản lâu — hợp bếp ăn và nhà hàng.",
    description: "Tỏi khô tuyển củ lớn, độ ẩm thấp, đóng bao 20kg. Phù hợp phân phối bán lẻ và bếp công nghiệp.",
    tags: ["bán chạy"],
  },
  {
    id: "p3",
    slug: "toi-phi",
    name: "Tỏi phi giòn",
    category: "processed",
    origin: "Nhà máy Bình Dương",
    listPricePerKg: 210_000,
    minOrderKg: 10,
    stockKg: 640,
    summary: "Tỏi phi vàng giòn, đóng hũ và túi zip — dùng ngay.",
    description: "Sản xuất theo quy trình khép kín, không chất bảo quản, hạn dùng 9 tháng.",
    tags: ["dùng liền", "OEM"],
  },
  {
    id: "p4",
    slug: "toi-boc-vo",
    name: "Tỏi bóc vỏ",
    category: "processed",
    origin: "Nhà máy Bình Dương",
    listPricePerKg: 98_000,
    minOrderKg: 20,
    stockKg: 1500,
    summary: "Tỏi đã bóc sạch vỏ, đóng chân không 1kg.",
    description: "Tiết kiệm nhân công cho bếp ăn và nhà máy chế biến. Giao lạnh trong ngày nội thành.",
    tags: ["tiết kiệm công"],
  },
  {
    id: "p5",
    slug: "toi-den-co-don",
    name: "Tỏi đen cô đơn",
    category: "black",
    origin: "Lý Sơn, Quảng Ngãi",
    listPricePerKg: 520_000,
    minOrderKg: 5,
    stockKg: 180,
    summary: "Lên men 60 ngày, vị ngọt dẻo, giàu antioxidant.",
    description: "Tỏi đen từ tỏi cô đơn Lý Sơn, đóng hộp 250g và 500g, có tem truy xuất nguồn gốc.",
    tags: ["cao cấp", "quà biếu"],
  },
  {
    id: "p6",
    slug: "toi-xay-dong-lanh",
    name: "Tỏi xay đông lạnh",
    category: "processed",
    origin: "Nhà máy Bình Dương",
    listPricePerKg: 78_000,
    minOrderKg: 30,
    stockKg: 900,
    summary: "Xay nhuyễn, đông lạnh từng khay 500g, giữ nguyên hương vị.",
    description: "Giải pháp cho chuỗi nhà hàng cần định lượng ổn định. Bảo quản -18°C.",
    tags: ["chuỗi F&B"],
  },
];

export async function mockListProducts(q?: { q?: string; category?: string }): Promise<Paginated<Product>> {
  const needle = q?.q?.toLowerCase().trim();
  const items = SEED_PRODUCTS.filter(
    (p) => (!q?.category || p.category === q.category) && (!needle || p.name.toLowerCase().includes(needle)),
  );
  return { items, total: items.length, page: 1, pageSize: items.length };
}

export async function mockGetProduct(slug: string): Promise<Product | null> {
  return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
}
