'use client';
import { applyEventFilters } from '@/lib';
import { scoreEvent } from '@/matching';
import { useProfileStore } from '@/stores';
import type { CampusEvent, EventFilters, ScoredEvent } from '@/types';
import { useNow } from './useNow';
export function useBrowseEvents(
  events: CampusEvent[],
  filters: EventFilters,
): { items: ScoredEvent[] } {
  const interests = useProfileStore((state) => state.interests);
  const faculty = useProfileStore((state) => state.faculty);
  const now = useNow();
  const profile = { interests, faculty, onboarded: true };
  const scores = Object.fromEntries(
    events.map((event) => [event.id, scoreEvent(profile, event, now)]),
  );
  return {
    items: applyEventFilters(
      events,
      filters,
      now,
      Object.fromEntries(Object.entries(scores).map(([id, result]) => [id, result.score])),
    ).map((event) => ({ event, score: scores[event.id] ?? scoreEvent(profile, event, now) })),
  };
}
