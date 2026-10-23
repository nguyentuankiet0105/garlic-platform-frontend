const vnd = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" });

export const formatVnd = (value: number) => vnd.format(value);
export const formatDate = (value: string | Date) => date.format(new Date(value));
