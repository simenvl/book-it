// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { clinicsRouter } from "./clinics";
import { resourcesRouter } from "./resources";
import { servicesRouter } from "./services";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("clinics.", clinicsRouter)
  .merge("resources.", resourcesRouter)
  .merge("services.", servicesRouter)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
