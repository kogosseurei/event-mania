import type { ReactElement } from 'react';
import type { ScoredEvent } from '@/types';
import { EventGrid } from '@/components/events';
import { Button, EmptyState, ErrorState } from '@/components/ui';
export interface BrowseResultsProps {
  error: boolean;
  loading: boolean;
  items: ScoredEvent[];
  retry(): void;
  clear(): void;
}
export function BrowseResults({
  error,
  loading,
  items,
  retry,
  clear,
}: BrowseResultsProps): ReactElement {
  if (error) return <ErrorState retry={retry} />;
  if (loading) return <EventGrid items={[]} loading reduceColumns />;
  if (items.length) return <EventGrid items={items} reduceColumns />;
  return (
    <EmptyState
      title="Nothing here just yet"
      description="Try a broader search. A new experience could be one filter away."
      action={<Button onClick={clear}>Clear all filters</Button>}
    />
  );
}
