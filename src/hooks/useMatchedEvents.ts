'use client';
import { useMemo } from 'react';
import { scoreEvent } from '@/matching';
import { useProfileStore } from '@/stores';
import type { CampusEvent, Interest, ScoredEvent } from '@/types';
import { FEED_MINIMUM_SCORE } from '@/config';
import { useNow } from './useNow';
export function useMatchedEvents(
  events: CampusEvent[],
  active: Interest | null = null,
): { items: ScoredEvent[] } {
  const interests = useProfileStore((state) => state.interests);
  const faculty = useProfileStore((state) => state.faculty);
  const now = useNow();
  const items = useMemo(() => {
    if (!now) return [];
    const profile = { interests, faculty, onboarded: true };
    return events
      .map((event) => ({ event, score: scoreEvent(profile, event, now) }))
      .filter(
        (item) =>
          item.score.score >= FEED_MINIMUM_SCORE &&
          Date.parse(item.event.endTime) > now &&
          (!active || item.event.tags.includes(active)),
      )
      .sort(
        (left, right) =>
          right.score.score - left.score.score ||
          left.event.startTime.localeCompare(right.event.startTime),
      );
  }, [events, interests, faculty, now, active]);
  return { items };
}
