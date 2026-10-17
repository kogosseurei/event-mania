import { z } from 'zod';
import { interestSchema } from './profile';
import { categorySchema, scoreResultSchema } from './event';
export const explanationMapSchema = z.object({ explanations: z.record(z.string(), z.string()), source: z.enum(['ai', 'fallback']) });
export const explanationInputSchema = z.object({ interests: z.array(interestSchema).max(10), faculty: z.string().nullable(), events: z.array(z.object({ id: z.string(), title: z.string(), category: categorySchema, tags: z.array(z.string()), score: scoreResultSchema })).max(12) });
export const searchInputSchema = z.object({ query: z.string().trim().min(1).max(200) });