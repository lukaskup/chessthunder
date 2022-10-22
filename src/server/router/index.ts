import { createRouter } from "./context";
import superjson from "superjson";

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
