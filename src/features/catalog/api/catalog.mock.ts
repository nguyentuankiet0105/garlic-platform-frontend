import type { AgentTier } from "@/features/agents";
import type { Paginated } from "@/shared/types/api";
import type { PackUnit, Product, ProductCategory, ProductOrigin, ProductSort } from "../types";
import { CATEGORY_LABEL } from "../types";

const STORAGE_DRY = "Nơi khô ráo, thoáng gió, tránh ánh nắng trực tiếp. Không để bao sát nền ẩm.";

type Seed = Omit<Product, "price"> & { prices: Record<AgentTier, number> };

/**
 * Dữ liệu mẫu (NEXT_PUBLIC_USE_MOCKS=true). Giá chỉ để minh hoạ giao diện — không phải bảng giá thật.
 * `prices` nằm ngoài kiểu Product: mock chỉ gắn `price` khi người xem là đại lý đã duyệt, đúng như backend sẽ làm.
 */
const SEEDS: Seed[] = [
  {
    id: "p1", slug: "toi-ly-son-loai-1", name: "Tỏi Lý Sơn loại 1", category: "lyson", origin: "ly-son",
    packLabel: "Bao 10kg", packUnit: "bao", minPacks: 2, packStep: 2, stock: "in",
    rating: { average: 4.8, count: 32, distribution: [26, 5, 1, 0, 0] },
    summary: "Tỏi tép nhỏ, vỏ tím nhạt, mùi thơm cay đặc trưng của đất cát núi lửa Lý Sơn.",
    description:
      "Tuyển chọn củ đều, phơi khô tự nhiên, đóng bao lưới 10kg có tem truy xuất lô. Phù hợp đại lý bán cho quán ăn và hộ gia đình.",
    storage: STORAGE_DRY, createdAt: "2026-06-01", prices: { T1: 1_450_000, T2: 1_380_000, T3: 1_320_000 },
  },
  {
    id: "p2", slug: "toi-ly-son-loai-2", name: "Tỏi Lý Sơn loại 2", category: "lyson", origin: "ly-son",
    packLabel: "Bao 10kg", packUnit: "bao", minPacks: 2, packStep: 2, stock: "in",
    rating: { average: 4.6, count: 18, distribution: [11, 6, 1, 0, 0] },
    summary: "Củ nhỏ hơn loại 1, cùng vùng trồng, giá mềm cho bếp ăn và chế biến.",
    description: "Tỏi Lý Sơn loại 2, đóng bao lưới 10kg. Hương vị tương đương loại 1, kích thước củ không đồng đều.",
    storage: STORAGE_DRY, createdAt: "2026-06-01", prices: { T1: 1_250_000, T2: 1_190_000, T3: 1_130_000 },
  },
  {
    id: "p3", slug: "toi-co-don-ly-son", name: "Tỏi cô đơn Lý Sơn", category: "codon", origin: "ly-son",
    packLabel: "Thùng 5kg", packUnit: "thùng", minPacks: 1, packStep: 1, stock: "low",
    rating: { average: 4.9, count: 41, distribution: [38, 3, 0, 0, 0] },
    summary: "Củ một tép, vị cay đậm, thơm nồng — hàng tuyển.",
    description: "Tỏi cô đơn trồng trên đất cát pha núi lửa Lý Sơn, phơi nắng tự nhiên, đóng thùng 5kg có tem truy xuất.",
    storage: STORAGE_DRY, createdAt: "2026-08-12", prices: { T1: 1_900_000, T2: 1_810_000, T3: 1_720_000 },
  },
  {
    id: "p4", slug: "toi-co-don-ngam-mat-ong", name: "Tỏi cô đơn ngâm mật ong", category: "codon", origin: "ly-son",
    packLabel: "Thùng 12 hũ 300g", packUnit: "thùng", minPacks: 1, packStep: 1, stock: "in",
    rating: null,
    summary: "Tỏi cô đơn ngâm mật ong, đóng hũ 300g — sản phẩm quà biếu.",
    description: "Ngâm tối thiểu 6 tháng, không chất bảo quản. Đóng thùng 12 hũ 300g.",
    storage: "Nơi mát, tránh ánh nắng. Sau khi mở nắp bảo quản trong ngăn mát.", createdAt: "2026-10-05",
    prices: { T1: 1_320_000, T2: 1_260_000, T3: 1_200_000 },
  },
  {
    id: "p5", slug: "toi-kho-phan-rang", name: "Tỏi khô Phan Rang", category: "kho", origin: "phan-rang",
    packLabel: "Bao 25kg", packUnit: "bao", minPacks: 1, packStep: 1, stock: "in",
    rating: { average: 4.5, count: 12, distribution: [7, 4, 1, 0, 0] },
    summary: "Củ đều, khô ráo, bảo quản lâu — hợp bếp ăn và nhà hàng.",
    description: "Tỏi khô Phan Rang, độ ẩm thấp, đóng bao 25kg. Phù hợp phân phối bán lẻ và bếp công nghiệp.",
    storage: STORAGE_DRY, createdAt: "2026-07-20", prices: { T1: 1_375_000, T2: 1_300_000, T3: 1_230_000 },
  },
  {
    id: "p6", slug: "toi-tim-ly-son-phoi-kho", name: "Tỏi tím Lý Sơn phơi khô", category: "kho", origin: "ly-son",
    packLabel: "Bao 10kg", packUnit: "bao", minPacks: 2, packStep: 2, stock: "in",
    rating: { average: 4.7, count: 9, distribution: [7, 1, 1, 0, 0] },
    summary: "Tỏi tím phơi khô kỹ, vỏ chắc, ít hao khi bảo quản.",
    description: "Tỏi tím Lý Sơn phơi khô, đóng bao lưới 10kg, có tem truy xuất lô.",
    storage: STORAGE_DRY, createdAt: "2026-09-02", prices: { T1: 1_320_000, T2: 1_260_000, T3: 1_200_000 },
  },
  {
    id: "p7", slug: "toi-phi-vang-hu-500g", name: "Tỏi phi vàng hũ 500g", category: "phi", origin: "phan-rang",
    packLabel: "Thùng 12 hũ", packUnit: "thùng", minPacks: 2, packStep: 1, stock: "in",
    rating: { average: 4.8, count: 27, distribution: [22, 5, 0, 0, 0] },
    summary: "Tỏi phi vàng giòn, đóng hũ 500g — dùng ngay.",
    description: "Sản xuất theo quy trình khép kín, không chất bảo quản. Đóng thùng 12 hũ 500g.",
    storage: "Nơi khô ráo, đậy kín nắp sau khi mở.", createdAt: "2026-05-15",
    prices: { T1: 1_680_000, T2: 1_600_000, T3: 1_520_000 },
  },
  {
    id: "p8", slug: "toi-boc-vo-hut-chan-khong", name: "Tỏi bóc vỏ sẵn hút chân không", category: "phi", origin: "phan-rang",
    packLabel: "Thùng 10 gói 1kg", packUnit: "thùng", minPacks: 1, packStep: 1, stock: "out",
    rating: { average: 4.4, count: 6, distribution: [3, 2, 1, 0, 0] },
    summary: "Tỏi đã bóc sạch vỏ, hút chân không từng gói 1kg.",
    description: "Tiết kiệm nhân công cho bếp ăn và nhà máy chế biến. Bảo quản lạnh.",
    storage: "Bảo quản ngăn mát 2–8°C, dùng trong 30 ngày kể từ ngày đóng gói.", createdAt: "2026-04-10",
    prices: { T1: 1_100_000, T2: 1_050_000, T3: 1_000_000 },
  },
];

export interface MockQuery {
  q?: string;
  category?: ProductCategory;
  origin?: ProductOrigin;
  pack?: PackUnit;
  inStock?: boolean;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

export const DEFAULT_PAGE_SIZE = 9;

const norm = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d").toLowerCase().trim();

function withPrice({ prices, ...p }: Seed, tier?: AgentTier): Product {
  return tier ? { ...p, price: { tier, perPack: prices[tier] } } : p;
}

export function filterSeeds(q: MockQuery = {}): Seed[] {
  const needle = q.q ? norm(q.q) : "";
  return SEEDS.filter(
    (p) =>
      (!q.category || p.category === q.category) &&
      (!q.origin || p.origin === q.origin) &&
      (!q.pack || p.packUnit === q.pack) &&
      (!q.inStock || p.stock !== "out") &&
      (!needle || norm(`${p.name} ${CATEGORY_LABEL[p.category]}`).includes(needle)),
  );
}

export function sortSeeds(list: Seed[], sort: ProductSort = "popular"): Seed[] {
  const out = [...list];
  if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  else if (sort === "newest") out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  else out.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0));
  return out;
}

export async function mockListProducts(q: MockQuery = {}, tier?: AgentTier): Promise<Paginated<Product>> {
  const sorted = sortSeeds(filterSeeds(q), q.sort);
  const pageSize = q.pageSize ?? DEFAULT_PAGE_SIZE;
  const page = Math.max(1, q.page ?? 1);
  const items = sorted.slice((page - 1) * pageSize, page * pageSize).map((s) => withPrice(s, tier));
  return { items, total: sorted.length, page, pageSize };
}

export async function mockGetProduct(slug: string, tier?: AgentTier): Promise<Product | null> {
  const s = SEEDS.find((p) => p.slug === slug);
  return s ? withPrice(s, tier) : null;
}

/** Số sản phẩm mỗi danh mục (áp dụng ô tìm kiếm, bỏ qua các bộ lọc khác) — để hiện số cạnh tên danh mục. */
export async function mockCategoryCounts(q?: string): Promise<Record<ProductCategory | "all", number>> {
  const list = filterSeeds({ q });
  const counts: Record<ProductCategory | "all", number> = { all: list.length, lyson: 0, codon: 0, kho: 0, phi: 0 };
  for (const p of list) counts[p.category]++;
  return counts;
}
