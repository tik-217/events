import {
  EventFormSchema,
  EventFormSchemaUpdate,
  JoinEventSchema,
  LeaveEventSchema,
} from "@/shared/api";
import { prisma } from "../db";
import { isAuth, procedure, router } from "../trpc";
import { z } from "zod";

export const eventRouter = router({
  findMany: procedure.query(async ({ ctx: { user } }) => {
    const events = await prisma.event.findMany({
      include: {
        participations: true,
      },
    });

    return events.map(({ participations, ...event }) => ({
      ...event,
      isJoined: participations.some(({ userId }) => userId === user?.id),
    }));
  }),
  findUnique: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input }) => {
      return prisma.event.findUnique({
        where: input,
        select: {
          title: true,
          description: true,
          date: true,
          authorId: true,
          participations: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  create: procedure
    .input(EventFormSchema)
    .use(isAuth)
    .mutation(async ({ input, ctx: { user } }) => {
      return await prisma.event.create({
        data: {
          authorId: user.id,
          ...input,
        },
      });
    }),
  update: procedure
    .input(EventFormSchemaUpdate)
    .use(isAuth)
    .mutation(async ({ input }) => {
      // deleting id from input
      const updatedEvent = (({ id, ...input }) => input)(input);

      return await prisma.event.update({
        where: {
          id: input.id,
        },
        data: updatedEvent,
      });
    }),
  join: procedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        },
      });
    }),
  leave: procedure
    .input(LeaveEventSchema)
    .use(isAuth)
    .mutation(async ({ input, ctx: { user } }) => {
      if (!user) {
        return await prisma.participation.findMany();
      }

      return await prisma.participation.delete({
        where: {
          userId_eventId: {
            eventId: input.id,
            userId: user.id,
          },
        },
      });
    }),
});
