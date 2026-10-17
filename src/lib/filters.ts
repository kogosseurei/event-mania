import type { CampusEvent, EventFilters } from '@/types';
import { eventFiltersSchema } from '@/schemas';
const DAY = 86_400_000;
export function parseEventFilters(parameters: URLSearchParams): EventFilters {
 return eventFiltersSchema.parse({ query: parameters.get('query') ?? '', categories: parameters.getAll('category'), venueIds: parameters.getAll('venue'), datePreset: parameters.get('date') ?? 'any', sort: parameters.get('sort') ?? 'soonest', ...(parameters.get('from') ? { from: parameters.get('from') } : {}), ...(parameters.get('to') ? { to: parameters.get('to') } : {}) });
}
export function serializeEventFilters(filters: EventFilters): URLSearchParams {
 const parameters = new URLSearchParams();
 if (filters.query) parameters.set('query', filters.query);
 filters.categories.forEach((value) => parameters.append('category', value));
 filters.venueIds.forEach((value) => parameters.append('venue', value));
 if (filters.datePreset !== 'any') parameters.set('date', filters.datePreset);
 if (filters.sort !== 'soonest') parameters.set('sort', filters.sort);
 if (filters.from) parameters.set('from', filters.from);
 if (filters.to) parameters.set('to', filters.to);
 return parameters;
}
function dateRange(filters: EventFilters, now: number): [number, number] {
 const today = new Date(now); today.setHours(0, 0, 0, 0);
 if (filters.datePreset === 'today') return [today.getTime(), today.getTime() + DAY];
 if (filters.datePreset === 'week') { const monday = today.getTime() - ((today.getDay() + 6) % 7) * DAY; return [monday, monday + 7 * DAY]; }
 if (filters.datePreset === 'month') return [new Date(today.getFullYear(), today.getMonth(), 1).getTime(), new Date(today.getFullYear(), today.getMonth() + 1, 1).getTime()];
 return [filters.from ? Date.parse(filters.from) : -Infinity, filters.to ? Date.parse(filters.to) : Infinity];
}
export function applyEventFilters(events: CampusEvent[], filters: EventFilters, now: number = Date.now(), scores: Record<string, number> = {}): CampusEvent[] {
 const [from, to] = dateRange(filters, now);
 const query = filters.query.trim().toLowerCase();
 const filtered = events.filter((event) => (!query || `${event.title} ${event.tags.join(' ')}`.toLowerCase().includes(query)) && (!filters.categories.length || filters.categories.includes(event.category)) && (!filters.venueIds.length || filters.venueIds.includes(event.venueId)) && Date.parse(event.startTime) >= from && Date.parse(event.startTime) < to);
 return filtered.sort((left, right) => {
  if (filters.sort === 'popular') return right.registeredCount - left.registeredCount || left.startTime.localeCompare(right.startTime);
  if (filters.sort === 'best-match') return (scores[right.id] ?? 0) - (scores[left.id] ?? 0) || left.startTime.localeCompare(right.startTime);
  return left.startTime.localeCompare(right.startTime);
 });
}