import { eventService } from '@/server/events';
import { handleRoute } from '@/server/http';
export async function GET(): Promise<Response> {
  return handleRoute(() => eventService.getVenues(), true);
}
