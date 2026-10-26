import "server-only";
import { serverHttp } from "@/shared/lib/api/server";
import { createCatalogApi, type CatalogViewer } from "./catalog.api";

/** `viewer.tier` chỉ truyền khi người xem là đại lý ĐÃ DUYỆT — khách/chờ duyệt không bao giờ nhận giá. */
export const catalogServer = (viewer?: CatalogViewer) => createCatalogApi(serverHttp("catalog"), viewer);
