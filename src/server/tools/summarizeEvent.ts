import type { CampusEvent, Venue } from '@/types';
export interface ToolEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  startTime: string;
  endTime: string;
  venue: string;
  organizer: string;
  spotsLeft: number;
  url: string;
}
export function summarizeEvent(event: CampusEvent, venues: Venue[]): ToolEvent {
  return {
    id: event.id,
    title: event.title,
    description: event.description.slice(0, 240),
    category: event.category,
    startTime: event.startTime,
    endTime: event.endTime,
    venue: venues.find((venue) => venue.id === event.venueId)?.name ?? event.venueId,
    organizer: event.organizer,
    spotsLeft: Math.max(0, event.capacity - event.registeredCount),
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/events/${event.id}`,
  };
}
