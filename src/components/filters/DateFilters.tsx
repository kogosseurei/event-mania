import type { ReactElement } from 'react';
import type { EventFilters } from '@/types';
export interface DateFiltersProps {
  filters: EventFilters;
  onChange(value: Partial<EventFilters>): void;
}
const fields = [
  { key: 'from', label: 'From' },
  { key: 'to', label: 'Until' },
] as const;
export function DateFilters({ filters, onChange }: DateFiltersProps): ReactElement {
  return (
    <fieldset>
      <legend>When</legend>
      <select
        aria-label="Event dates"
        value={filters.datePreset}
        onChange={(event) =>
          onChange({ datePreset: event.target.value as EventFilters['datePreset'] })
        }
      >
        <option value="any">Any time</option>
        <option value="today">Today</option>
        <option value="week">This week</option>
        <option value="month">This month</option>
        <option value="custom">Choose dates</option>
      </select>
      {filters.datePreset === 'custom' && (
        <div className="custom-dates">
          {fields.map(({ key, label }) => (
            <label className="field" key={key}>
              {label}
              <input
                type="date"
                value={filters[key]?.slice(0, 10) ?? ''}
                onChange={(event) =>
                  onChange({
                    [key]: event.target.value
                      ? new Date(event.target.value).toISOString()
                      : undefined,
                  })
                }
              />
            </label>
          ))}
        </div>
      )}
    </fieldset>
  );
}
