import { z } from "zod";

export const EventFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable(),
  date: z.coerce.date(),
});

export type EventFormSchema = z.infer<typeof EventFormSchema>;

export const EventFormSchemaUpdate = EventFormSchema.extend({
  id: z.number().int().positive(),
});

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
});

export const LeaveEventSchema = z.object({
  id: z.number().int().positive(),
});
