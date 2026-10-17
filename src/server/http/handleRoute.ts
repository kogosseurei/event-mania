import { ZodError } from 'zod';
import { logger } from '@/lib';
import { AppError } from './errors';
import { jsonResponse } from './jsonResponse';
export async function handleRoute(operation: () => Promise<unknown> | unknown, cache: boolean = false): Promise<Response> {
 try { return jsonResponse(await operation(), 200, cache); }
 catch (error) {
  if (error instanceof ZodError) return jsonResponse({ error: { code: 'VALIDATION_ERROR', message: error.issues.map((issue) => issue.message).join('; ') } }, 400);
  if (error instanceof AppError) return jsonResponse({ error: { code: error.code, message: error.message } }, error.status);
  if (error instanceof SyntaxError) return jsonResponse({ error: { code: 'VALIDATION_ERROR', message: 'Invalid JSON body' } }, 400);
  logger.error('Request failed', error); return jsonResponse({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } }, 500);
 }
}