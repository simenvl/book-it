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

  .query("getServicesInResource", {
    input: z.object({ resourceId: z.string() }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.resources.findMany({
          where: { id: input.resourceId },
          select: { services: { select: { servicesId: true } } },
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

  .mutation("deleteServiceFromResource", {
    input: z.object({ serviceId: z.string(), resourceId: z.string() }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.servicesWithResources.delete({
          where: {
            resourcesId_servicesId: {
              servicesId: input.serviceId,
              resourcesId: input.resourceId,
            },
          },
        });
      } catch (error) {}
    },
  })

  .mutation("updateResource", {
    input: z.object({
      resourceId: z.string(),
      serviceId: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.resources.update({
          where: { id: input.resourceId },
          data: {
            services: {
              deleteMany: {
                servicesId: input.serviceId,
                resourcesId: input.resourceId,
              },
              createMany: {
                data: {
                  servicesId: input.serviceId,
                },
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
