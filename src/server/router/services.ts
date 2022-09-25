import { z } from "zod";
import { createRouter } from "./context";

export const servicesRouter = createRouter()
  .mutation("createService", {
    input: z.object({
      name: z.string(),
      price: z.number(),
      duration: z.number(),
      resourceId: z.string(),
      clinicId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.services.create({
          data: {
            name: input.name,
            price: input.price,
            duration: input.duration,
            resources: {
              create: {
                resourcesId: input.resourceId,
              },
            },
            clinics: {
              create: {
                clinicsId: input.clinicId,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })

  .query("getAllServices", {
    async resolve({ ctx }) {
      return await ctx.prisma.services.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })

  .query("getService", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.services.findUnique({
        where: { id: input.id },
      });
    },
  })

  .query("getServiceInResource", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.services.findMany({
        where: { id: input.id },
        include: { resources: true },
      });
    },
  })

  .query("getServicesInClinic", {
    input: z.object({ clinicId: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.services.findMany({
        where: { clinics: { some: { clinicsId: input.clinicId } } },
      });
    },
  });
