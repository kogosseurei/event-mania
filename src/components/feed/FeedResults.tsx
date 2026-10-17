import type { ReactElement } from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import type { FeedBehavior } from '@/hooks';
import { EventGrid } from '@/components/events';
import { EmptyState, ErrorState } from '@/components/ui';
import { FeedEventList } from './FeedEventList';
export interface FeedResultsProps {
  behavior: FeedBehavior;
}
export function FeedResults({ behavior }: FeedResultsProps): ReactElement {
  if (behavior.error) return <ErrorState retry={behavior.retry} />;
  if (behavior.loading) return <EventGrid items={[]} loading />;
  if (behavior.featured) return <FeedEventList behavior={behavior} />;
  return (
    <EmptyState
      title="A world beyond your usual"
      description="No matches just yet. Explore every event or try a different interest."
      action={
        <Link href="/browse" className="button button-primary">
          <Compass size={18} />
          Browse events
        </Link>
      }
    />
  );
}
