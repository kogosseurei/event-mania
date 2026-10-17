import type { CampusEvent, Venue } from '@/types';
export interface EventRepository {
  listEvents(): Promise<CampusEvent[]>;
  getEventById(id: string): Promise<CampusEvent | null>;
  listVenues(): Promise<Venue[]>;
}
