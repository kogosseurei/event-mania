import { z } from 'zod';
export const categorySchema = z.enum(['tech', 'sports', 'music', 'careers', 'clubs', 'arts']);
const eventFields = {
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: categorySchema,
  tags: z.array(z.string()),
  venueId: z.string(),
  organizer: z.string(),
  faculty: z.string().nullable(),
  capacity: z.number().int().positive(),
  registeredCount: z.number().int().nonnegative(),
  coverPublicId: z.string().min(1),
};
export const eventSchema = z
  .object({
    ...eventFields,
    startTime: z.iso.datetime(),
    endTime: z.iso.datetime(),
    agenda: z.array(z.object({ time: z.iso.datetime(), label: z.string() })),
  })
  .refine((event) => event.endTime > event.startTime, 'End must follow start')
  .refine((event) => event.registeredCount <= event.capacity, 'Attendance cannot exceed capacity');
export const rawEventSchema = z.object({
  ...eventFields,
  startOffsetMinutes: z.number().int(),
  durationMinutes: z.number().int().positive(),
  agenda: z.array(z.object({ offsetMinutes: z.number().nonnegative(), label: z.string() })),
});
export const scoreResultSchema = z.object({
  score: z.number().min(0).max(100),
  matchedInterests: z.array(z.string()),
  categoryMatched: z.boolean(),
  reasons: z.array(z.string()),
});
