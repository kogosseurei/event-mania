'use client';
import { useNow } from '@/hooks';
import type { ReactElement } from 'react';
import type { CampusEvent, ScoreResult } from '@/types';
import { CloudImage } from '@/components/ui';
import { CategoryBadge } from './CategoryBadge';
import { MatchPill } from './MatchPill';
import { StatusChip } from './StatusChip';
import { SaveButton } from './SaveButton';
export interface EventCardCoverProps {
  event: CampusEvent;
  score: ScoreResult;
}
export function EventCardCover({ event, score }: EventCardCoverProps): ReactElement {
  const now = useNow();
  return (
    <div className={`event-cover ${Date.parse(event.endTime) <= now ? 'event-cover-past' : ''}`}>
      <CloudImage publicId={event.coverPublicId} alt={`${event.title} event artwork`} />
      <div className="cover-top">
        <CategoryBadge category={event.category} />
        <SaveButton eventId={event.id} />
      </div>
      <div className="cover-bottom">
        <MatchPill score={score.score} />
        <StatusChip startTime={event.startTime} endTime={event.endTime} />
      </div>
    </div>
  );
}
