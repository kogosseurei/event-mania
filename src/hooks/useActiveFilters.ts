import type { EventFilters } from '@/types';
export interface ActiveFilter {
  id: string;
  label: string;
  remove(): void;
}
export function useActiveFilters(
  filters: EventFilters,
  onChange: (value: Partial<EventFilters>) => void,
): ActiveFilter[] {
  return [
    ...(filters.query
      ? [{ id: 'query', label: filters.query, remove: () => onChange({ query: '' }) }]
      : []),
    ...filters.categories.map((category) => ({
      id: `category:${category}`,
      label: category,
      remove: () =>
        onChange({ categories: filters.categories.filter((value) => value !== category) }),
    })),
    ...filters.venueIds.map((venue) => ({
      id: `venue:${venue}`,
      label: venue.replaceAll('-', ' '),
      remove: () => onChange({ venueIds: filters.venueIds.filter((value) => value !== venue) }),
    })),
    ...(filters.datePreset !== 'any'
      ? [
          {
            id: 'date',
            label: filters.datePreset,
            remove: () => onChange({ datePreset: 'any', from: undefined, to: undefined }),
          },
        ]
      : []),
  ];
}
