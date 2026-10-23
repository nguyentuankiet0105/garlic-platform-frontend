import "server-only";
import { serverHttp } from "@/shared/lib/api/server";
import { createContentApi } from "./content.api";

export const contentServer = () => createContentApi(serverHttp("catalog"));
