import { parseEventFilters } from '@/lib';
import { eventService } from '@/server/events';
import { handleRoute } from '@/server/http';
export async function GET(request: Request): Promise<Response> { return handleRoute(() => eventService.getEvents(parseEventFilters(new URL(request.url).searchParams)), true); }