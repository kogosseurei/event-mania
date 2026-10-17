import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { FeedBehavior } from '@/hooks';
import { EventGrid, FeaturedEvent } from '@/components/events';
import { LoadMore } from './LoadMore';
export interface FeedEventListProps {
  behavior: FeedBehavior;
}
export function FeedEventList({ behavior }: FeedEventListProps): ReactElement {
  return (
    <>
      {behavior.featured && (
        <FeaturedEvent
          item={behavior.featured}
          explanation={behavior.explanations.explanations[behavior.featured.event.id] ?? ''}
        />
      )}
      <div className="section-heading feed-heading">
        <div>
          <h2>More your kind of thing</h2>
          <p>Good plans, great people, and something new.</p>
        </div>
        <Link href="/browse">
          View all events
          <ArrowRight size={15} />
        </Link>
      </div>
      <EventGrid items={behavior.items} explanations={behavior.explanations} />
      <LoadMore onLoad={behavior.loadMore} hasMore={behavior.hasMore} />
    </>
  );
}
