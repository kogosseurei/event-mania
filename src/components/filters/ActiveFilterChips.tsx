import type { ReactElement } from 'react';
import { X } from 'lucide-react';
import type { EventFilters } from '@/types';
import { Chip } from '@/components/ui';
import { useActiveFilters } from '@/hooks';
export interface ActiveFilterChipsProps {
  filters: EventFilters;
  onChange(value: Partial<EventFilters>): void;
}
export function ActiveFilterChips({ filters, onChange }: ActiveFilterChipsProps): ReactElement {
  const chips = useActiveFilters(filters, onChange);
  return (
    <div className="active-filters">
      {chips.map((chip) => (
        <Chip key={chip.id} selected onClick={chip.remove}>
          {chip.label}
          <X size={12} />
        </Chip>
      ))}
    </div>
  );
}
