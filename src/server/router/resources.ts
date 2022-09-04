import { z } from "zod";
import { createRouter } from "./context";

export const resourcesRouter = createRouter()
  .mutation("createResource", {
    input: z.object({
      name: z.string(),
      clinicsId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.resources.create({
          data: {
            name: input.name,
            clinicsId: input.clinicsId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })

  .query("getAllResources", {
    async resolve({ ctx }) {
      return await ctx.prisma.resources.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })

  .query("getResource", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.resources.findUnique({
        where: { id: input.id },
      });
    },
  })

  .query("getResourceInClinic", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.resources.findMany({
        where: { clinicsId: input.id },
      });
    },
  });
