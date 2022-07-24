// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { apiRouter } from "./api";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("api.", apiRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
