import { createRouter } from "./context";
import superjson from "superjson";
import fetch from "node-fetch";

if (!global.fetch) {
  (global.fetch as any) = fetch;
}

import { authRouter } from "./auth";
import { apiRouter } from "./api";
import { gameRouter } from "./game";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("api.", apiRouter)
  .merge("game.", gameRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
