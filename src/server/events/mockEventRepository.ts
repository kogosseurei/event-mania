import { z } from 'zod';
import rawEvents from '@/data/events.stub.json';
import { eventSchema, rawEventSchema, venueSchema } from '@/schemas';
import { HOUR_MS, MINUTE_MS, MOCK_DELAY_MS, university } from '@/config';
import type { CampusEvent, Venue } from '@/types';
import type { EventRepository } from './eventRepository';
const validated = z.array(rawEventSchema).length(10).parse(rawEvents);
export class MockEventRepository implements EventRepository {
  constructor(private readonly delay: number = MOCK_DELAY_MS) {}
  async listEvents(): Promise<CampusEvent[]> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    const anchor = Math.floor(Date.now() / HOUR_MS) * HOUR_MS;
    return validated.map((raw) => {
      const { startOffsetMinutes, durationMinutes, agenda, ...event } = raw;
      const start = anchor + startOffsetMinutes * MINUTE_MS;
      return eventSchema.parse({
        ...event,
        startTime: new Date(start).toISOString(),
        endTime: new Date(start + durationMinutes * MINUTE_MS).toISOString(),
        agenda: agenda.map((item) => ({
          time: new Date(start + item.offsetMinutes * MINUTE_MS).toISOString(),
          label: item.label,
        })),
      });
    });
  }
  async getEventById(id: string): Promise<CampusEvent | null> {
    return (await this.listEvents()).find((event) => event.id === id) ?? null;
  }
  async listVenues(): Promise<Venue[]> {
    return z.array(venueSchema).parse(university.venues);
  }
}
