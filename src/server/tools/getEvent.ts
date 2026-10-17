import { eventService } from '../events';
import { getToolSchema } from './toolSchemas';
import { summarizeEvent, type ToolEvent } from './summarizeEvent';
export async function getEvent(input: unknown): Promise<ToolEvent> {
  const { id } = getToolSchema.parse(input);
  const [event, venues] = await Promise.all([
    eventService.getEventById(id),
    eventService.getVenues(),
  ]);
  return summarizeEvent(event, venues);
}
