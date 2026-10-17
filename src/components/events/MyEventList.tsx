import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { MyEventsBehavior } from '@/hooks';
import { EmptyState, ErrorState } from '@/components/ui';
import { EventGrid } from './EventGrid';
export interface MyEventListProps {
  behavior: MyEventsBehavior;
}
export function MyEventList({ behavior }: MyEventListProps): ReactElement {
  if (behavior.error) return <ErrorState retry={behavior.retry} />;
  if (behavior.loading) return <EventGrid items={[]} loading compact />;
  if (behavior.upcoming.length) return <EventGrid items={behavior.upcoming} compact />;
  const saved = behavior.tab === 'saved';
  const action = (
    <Link href="/browse" className="button button-primary">
      Find your next event
      <ArrowUpRight size={16} />
    </Link>
  );
  return (
    <EmptyState
      title={saved ? 'Leave room for a maybe.' : 'Your next good plan is out there.'}
      description={
        saved
          ? 'Tap a heart on any event to keep it here.'
          : 'Explore campus events and RSVP to something that catches your eye.'
      }
      action={action}
    />
  );
}
