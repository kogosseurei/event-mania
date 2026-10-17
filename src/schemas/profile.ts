import { z } from 'zod';
export const interestSchema = z.enum([
  'tech',
  'sports',
  'music',
  'careers',
  'clubs',
  'arts',
  'volunteering',
  'entrepreneurship',
  'gaming',
  'wellness',
]);
export const studentProfileSchema = z.object({
  interests: z.array(interestSchema).max(10),
  faculty: z.string().nullable(),
  onboarded: z.boolean(),
});
