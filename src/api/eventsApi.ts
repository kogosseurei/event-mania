import { z } from 'zod';
import { eventSchema, venueSchema } from '@/schemas';
import type { CampusEvent, Venue } from '@/types';
async function readResponse<T>(url: string, schema: z.ZodType<T>): Promise<T> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      response.status === 404 ? 'Event not found' : 'Unable to load events. Please try again.',
    );
  return schema.parse(await response.json());
}
export function fetchEvents(): Promise<CampusEvent[]> {
  return readResponse('/api/events', z.array(eventSchema));
}
export function fetchEvent(id: string): Promise<CampusEvent> {
  return readResponse(`/api/events/${encodeURIComponent(id)}`, eventSchema);
}
export function fetchVenues(): Promise<Venue[]> {
  return readResponse('/api/venues', z.array(venueSchema));
}
