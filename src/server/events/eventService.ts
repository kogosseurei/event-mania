import { categories } from '@/config';
import { applyEventFilters } from '@/lib';
import { scoreEvent } from '@/matching';
import type { CampusEvent, EventFilters, ScoredEvent, StudentProfile, Venue } from '@/types';
import type { EventRepository } from './eventRepository';
import { NotFoundError } from '../http';
export class EventService {
  constructor(private readonly repository: EventRepository) {}
  async getEvents(filters: EventFilters): Promise<CampusEvent[]> {
    return applyEventFilters(await this.repository.listEvents(), filters);
  }
  async searchEvents(filters: EventFilters): Promise<CampusEvent[]> {
    return this.getEvents(filters);
  }
  async getEventById(id: string): Promise<CampusEvent> {
    const event = await this.repository.getEventById(id);
    if (!event) throw new NotFoundError('Event not found');
    return event;
  }
  async getVenues(): Promise<Venue[]> {
    return this.repository.listVenues();
  }
  getCategories(): typeof categories {
    return categories;
  }
  async recommendEvents(profile: StudentProfile, limit: number = 10): Promise<ScoredEvent[]> {
    const now = Date.now();
    return (await this.repository.listEvents())
      .map((event) => ({ event, score: scoreEvent(profile, event, now) }))
      .filter((item) => item.score.score >= 20)
      .sort(
        (left, right) =>
          right.score.score - left.score.score ||
          left.event.startTime.localeCompare(right.event.startTime),
      )
      .slice(0, limit);
  }
}
