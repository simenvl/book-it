import { z } from "zod";
import { createRouter } from "./context";

export const clinicsRouter = createRouter()
  .mutation("createClinic", {
    input: z.object({
      name: z.string(),
      streetName: z.string(),
      postalCode: z.string(),
      city: z.string(),
      country: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.clinics.create({
          data: {
            name: input.name,
            streetName: input.streetName,
            postalCode: input.postalCode,
            city: input.city,
            country: input.country,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.clinics.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  });
