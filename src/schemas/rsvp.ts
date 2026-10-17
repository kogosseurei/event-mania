import { z } from 'zod';
export const rsvpRecordSchema = z.object({ eventId: z.string(), title: z.string(), startTime: z.iso.datetime(), endTime: z.iso.datetime(), createdAt: z.iso.datetime() });