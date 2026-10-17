import { z } from 'zod';
import { categorySchema } from './event';
export const eventFiltersSchema = z.object({
  query: z.string().max(200).default(''),
  categories: z.array(categorySchema).default([]),
  venueIds: z.array(z.string()).default([]),
  datePreset: z.enum(['any', 'today', 'week', 'month', 'custom']).default('any'),
  from: z.iso.datetime().optional(),
  to: z.iso.datetime().optional(),
  sort: z.enum(['soonest', 'best-match', 'popular']).default('soonest'),
});
