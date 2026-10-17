import type { ReactElement } from 'react';
import { university } from '@/config';
import type { EventFilters } from '@/types';
export interface VenueFiltersProps {
  filters: EventFilters;
  onChange(value: Partial<EventFilters>): void;
}
export function VenueFilters({ filters, onChange }: VenueFiltersProps): ReactElement {
  return (
    <fieldset>
      <legend>Where on campus</legend>
      {university.venues.map((venue) => (
        <label className="checkbox-label" key={venue.id}>
          <input
            type="checkbox"
            checked={filters.venueIds.includes(venue.id)}
            onChange={() =>
              onChange({
                venueIds: filters.venueIds.includes(venue.id)
                  ? filters.venueIds.filter((id) => id !== venue.id)
                  : [...filters.venueIds, venue.id],
              })
            }
          />
          <span>{venue.name}</span>
        </label>
      ))}
    </fieldset>
  );
}
