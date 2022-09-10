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
            clinics: { create: { clinicsId: input.clinicsId } },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })

  .query("getAllResources", {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.resources.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })

  .query("getResource", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.resources.findUnique({
          where: { id: input.id },
          include: { services: true, clinics: true, appointments: true },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })

  .query("getResourceInClinic", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.resources.findMany({
          where: {
            clinics: {
              some: {
                clinicsId: input.id,
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })

  .query("getResourceWithService", {
    input: z.object({ serviceId: z.string() }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.resources.findMany({
          where: {
            services: { some: { serviceId: input.serviceId } },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })

  .mutation("deleteResource", {
    input: z.object({ resourceId: z.string() }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.resources.delete({
          where: { id: input.resourceId },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })

  .mutation("updateResource", {
    input: z.object({
      resourceId: z.string(),
      serviceId: z.string(),
      clinicId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.resources.update({
          where: { id: input.resourceId },
          data: {
            services: {
              createMany: {
                data: { serviceId: input.serviceId, clinicsId: input.clinicId },
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
