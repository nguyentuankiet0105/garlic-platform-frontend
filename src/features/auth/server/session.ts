import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { ACCESS_COOKIE } from "@/shared/config/cookies";
import { decodeSession } from "../lib/jwt";
import type { Session } from "../types";

/** Session của request hiện tại (memoize trong 1 render pass). */
export const getSession = cache(async (): Promise<Session | null> => {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  return decodeSession(token);
});
