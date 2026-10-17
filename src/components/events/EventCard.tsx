import type { ReactElement } from 'react';
import { cva } from 'class-variance-authority';
import type { CampusEvent, ScoreResult } from '@/types';
import { EventCardCover } from './EventCardCover';
import { EventCardBody } from './EventCardBody';
export interface EventCardProps {
  event: CampusEvent;
  score: ScoreResult;
  explanation: string;
  source?: 'ai' | 'fallback';
  variant?: 'default' | 'compact' | 'featured';
}
const variants = cva('event-card', {
  variants: {
    variant: { default: '', compact: 'event-card-compact', featured: 'event-card-featured' },
  },
});
export function EventCard({
  event,
  score,
  explanation,
  source = 'fallback',
  variant = 'default',
}: EventCardProps): ReactElement {
  return (
    <article className={variants({ variant })}>
      <EventCardCover event={event} score={score} />
      <EventCardBody
        event={event}
        explanation={explanation}
        source={source}
        compact={variant === 'compact'}
      />
    </article>
  );
}
