import { eventFiltersSchema } from '@/schemas';
import { eventService } from '../events';
import { searchToolSchema } from './toolSchemas';
import { summarizeEvent, type ToolEvent } from './summarizeEvent';
export async function searchEvents(input: unknown): Promise<ToolEvent[]> {
  const parameters = searchToolSchema.parse(input);
  const filters = eventFiltersSchema.parse({
    query: parameters.query ?? '',
    categories: parameters.category ? [parameters.category] : [],
    venueIds: parameters.venue ? [parameters.venue] : [],
    from: parameters.from,
    to: parameters.to,
  });
  const [events, venues] = await Promise.all([
    eventService.searchEvents(filters),
    eventService.getVenues(),
  ]);
  return events.slice(0, parameters.limit).map((event) => summarizeEvent(event, venues));
}
