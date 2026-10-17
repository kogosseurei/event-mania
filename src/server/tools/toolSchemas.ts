import { z } from 'zod';
import { categorySchema, interestSchema } from '@/schemas';
export const searchToolSchema=z.object({query:z.string().max(200).optional(),category:categorySchema.optional(),venue:z.string().optional(),from:z.iso.datetime().optional(),to:z.iso.datetime().optional(),limit:z.number().int().min(1).max(20).default(10)});
export const getToolSchema=z.object({id:z.string().min(1)});
export const recommendToolSchema=z.object({interests:z.array(interestSchema).max(10),faculty:z.string().nullable().default(null),limit:z.number().int().min(1).max(20).default(10)});
export const emptyToolSchema=z.object({});