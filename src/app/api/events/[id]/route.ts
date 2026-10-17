import { z } from 'zod';
import { eventService } from '@/server/events';
import { handleRoute } from '@/server/http';
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> { return handleRoute(async () => eventService.getEventById(z.string().min(1).parse((await context.params).id)), true); }