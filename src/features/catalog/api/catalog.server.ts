import "server-only";
import { serverHttp } from "@/shared/lib/api/server";
import { createCatalogApi } from "./catalog.api";

export const catalogServer = () => createCatalogApi(serverHttp("catalog"));
