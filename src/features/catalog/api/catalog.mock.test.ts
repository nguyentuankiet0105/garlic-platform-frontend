import { describe, expect, it } from "vitest";
import { mockCategoryCounts, mockGetProduct, mockListProducts } from "./catalog.mock";

describe("catalog mock — giá chỉ theo viewer", () => {
  it("không gắn price khi không có cấp (khách / chờ duyệt)", async () => {
    const { items } = await mockListProducts({});
    expect(items.length).toBeGreaterThan(0);
    for (const p of items) expect(p).not.toHaveProperty("price");
    expect(await mockGetProduct("toi-ly-son-loai-1")).not.toHaveProperty("price");
  });
  it("gắn đúng giá theo cấp và cấp cao giá thấp hơn", async () => {
    const t1 = (await mockGetProduct("toi-ly-son-loai-1", "T1"))!.price!;
    const t3 = (await mockGetProduct("toi-ly-son-loai-1", "T3"))!.price!;
    expect(t1.tier).toBe("T1");
    expect(t3.tier).toBe("T3");
    expect(t3.perPack).toBeLessThan(t1.perPack);
  });
  it("không bao giờ lộ bảng giá các cấp khác trong đối tượng trả về", async () => {
    const p = await mockGetProduct("toi-ly-son-loai-1", "T2");
    expect(JSON.stringify(p)).not.toContain("prices");
  });
});

describe("catalog mock — lọc, sắp xếp, phân trang", () => {
  it("lọc theo danh mục / vùng / còn hàng", async () => {
    expect((await mockListProducts({ category: "kho" })).items.every((p) => p.category === "kho")).toBe(true);
    expect((await mockListProducts({ origin: "phan-rang" })).items.every((p) => p.origin === "phan-rang")).toBe(true);
    expect((await mockListProducts({ inStock: true })).items.some((p) => p.stock === "out")).toBe(false);
  });
  it("tìm không phân biệt dấu", async () => {
    const { items } = await mockListProducts({ q: "toi co don" });
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((p) => p.category === "codon")).toBe(true);
  });
  it("sắp xếp tên A–Z và mới nhất", async () => {
    const byName = (await mockListProducts({ sort: "name" })).items.map((p) => p.name);
    expect(byName).toEqual([...byName].sort((a, b) => a.localeCompare(b, "vi")));
    const byNew = (await mockListProducts({ sort: "newest" })).items.map((p) => p.createdAt);
    expect(byNew).toEqual([...byNew].sort().reverse());
  });
  it("phân trang theo pageSize", async () => {
    const r = await mockListProducts({ pageSize: 3, page: 2 });
    expect(r.items).toHaveLength(3);
    expect(r.total).toBeGreaterThan(3);
    expect(r.page).toBe(2);
  });
  it("đếm theo danh mục khớp tổng", async () => {
    const c = await mockCategoryCounts();
    expect(c.lyson + c.codon + c.kho + c.phi).toBe(c.all);
  });
});
