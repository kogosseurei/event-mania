import type { ReactElement } from 'react';
import { categories } from '@/config';
import type { EventFilters } from '@/types';
import { Chip, Button } from '@/components/ui';
import { DateFilters } from './DateFilters';
import { VenueFilters } from './VenueFilters';
export interface FilterFormProps {
  filters: EventFilters;
  onChange(value: Partial<EventFilters>): void;
  onClear(): void;
}
export function FilterForm({ filters, onChange, onClear }: FilterFormProps): ReactElement {
  return (
    <div className="filter-form">
      <div className="filter-heading">
        <h2>Make it your plan</h2>
        <Button variant="ghost" onClick={onClear}>
          Reset
        </Button>
      </div>
      <DateFilters filters={filters} onChange={onChange} />
      <fieldset>
        <legend>Something you love</legend>
        <div className="filter-categories">
          {categories.map((category) => (
            <Chip
              key={category.id}
              selected={filters.categories.includes(category.id)}
              onClick={() =>
                onChange({
                  categories: filters.categories.includes(category.id)
                    ? filters.categories.filter((id) => id !== category.id)
                    : [...filters.categories, category.id],
                })
              }
            >
              {category.label}
            </Chip>
          ))}
        </div>
      </fieldset>
      <VenueFilters filters={filters} onChange={onChange} />
    </div>
  );
}
