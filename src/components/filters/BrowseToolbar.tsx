import type { ReactElement } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import type { EventFilters } from '@/types';
import { Button } from '@/components/ui';
export interface BrowseToolbarProps {
  count: number;
  panel: boolean;
  sort: EventFilters['sort'];
  onSort(sort: EventFilters['sort']): void;
  onOpen(): void;
}
export function BrowseToolbar({
  count,
  panel,
  sort,
  onSort,
  onOpen,
}: BrowseToolbarProps): ReactElement {
  return (
    <div className="browse-toolbar">
      <span>
        <strong>{count}</strong> events to explore
      </span>
      <div>
        {!panel && (
          <Button variant="secondary" onClick={onOpen}>
            <SlidersHorizontal size={16} />
            Filters
          </Button>
        )}
        <select
          aria-label="Sort events"
          value={sort}
          onChange={(event) => onSort(event.target.value as EventFilters['sort'])}
        >
          <option value="soonest">Soonest first</option>
          <option value="best-match">Best match</option>
          <option value="popular">Most popular</option>
        </select>
      </div>
    </div>
  );
}
