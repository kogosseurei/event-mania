import type { ReactElement } from 'react';
import type { CampusEvent } from '@/types';
import { university } from '@/config';
import { Badge, Section } from '@/components/ui';
import { CategoryBadge } from './CategoryBadge';
import { MatchPill } from './MatchPill';
import { EventFacts } from './EventFacts';
import { AttendanceMeter } from './AttendanceMeter';
import { AgendaTimeline } from './AgendaTimeline';
import { VenueCard } from './VenueCard';
export interface EventDetailContentProps {
  event: CampusEvent;
  score: number;
  explanation: string;
}
export function EventDetailContent({
  event,
  score,
  explanation,
}: EventDetailContentProps): ReactElement {
  const venue = university.venues.find((item) => item.id === event.venueId);
  return (
    <>
      <div className="flow detail-badges">
        <CategoryBadge category={event.category} />
        <MatchPill score={score} />
      </div>
      <h1>{event.title}</h1>
      <p className="detail-explanation">{explanation}</p>
      <EventFacts event={event} />
      <Section title="A little about the event">
        <p className="detail-description">{event.description}</p>
      </Section>
      <AttendanceMeter event={event} />
      <Section title="Here’s the plan">
        <AgendaTimeline items={event.agenda} />
      </Section>
      {venue && (
        <Section title="Find your way">
          <VenueCard venue={venue} />
        </Section>
      )}
      <div className="flow">
        {event.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </>
  );
}
