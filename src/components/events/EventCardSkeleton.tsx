import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';
export function EventCardSkeleton(): ReactElement {
  return (
    <div className="event-card" role="status" aria-label="Loading event">
      <Skeleton shape="block" />
      <div className="event-body">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}
