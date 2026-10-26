import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockGetProduct } from "../api/catalog.mock";
import { ProductCard } from "./product-card";

describe("ProductCard hiển thị giá theo người xem", () => {
  it("khách: chỉ có lời mời đăng nhập, không có số tiền", async () => {
    const p = (await mockGetProduct("toi-ly-son-loai-1"))!;
    const { container } = render(<ProductCard product={p} viewer="guest" />);
    expect(screen.getByText("Đăng nhập để xem giá sỉ")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\d{1,3}(\.\d{3}){2}/);
  });
  it("chờ duyệt: báo giá hiển thị sau khi duyệt", async () => {
    const p = (await mockGetProduct("toi-ly-son-loai-1"))!;
    render(<ProductCard product={p} viewer="pending" />);
    expect(screen.getByText("Giá hiển thị sau khi được duyệt")).toBeInTheDocument();
  });
  it("đại lý đã duyệt: thấy giá và tên cấp", async () => {
    const p = (await mockGetProduct("toi-ly-son-loai-1", "T3"))!;
    const { container } = render(<ProductCard product={p} viewer="agent" />);
    expect(container.textContent).toMatch(/1\.320\.000/);
    expect(container.textContent).toContain("giá cấp Vàng");
  });
  it("viewer=agent nhưng server không trả giá → không bịa số, quay về lời mời đăng nhập", async () => {
    const p = (await mockGetProduct("toi-ly-son-loai-1"))!;
    render(<ProductCard product={p} viewer="agent" />);
    expect(screen.getByText("Đăng nhập để xem giá sỉ")).toBeInTheDocument();
  });
});
