'use client';
import type { CampusEvent } from '@/types';
import { scoreEvent } from '@/matching';
import { useProfileStore } from '@/stores';
import { useEvent } from './useEvent';
import { useBreakpoint } from './useBreakpoint';
import { useExplanations } from './useExplanations';
import { useProfileHydrated } from './useHasHydrated';
import { useNow } from './useNow';
export interface EventDetailBehavior {
  event: CampusEvent | undefined;
  loading: boolean;
  wide: boolean;
  score: number;
  explanation: string;
  retry(): void;
}
export function useEventDetail(id: string): EventDetailBehavior {
  useProfileHydrated();
  const query = useEvent(id);
  const breakpoint = useBreakpoint();
  const interests = useProfileStore((state) => state.interests);
  const faculty = useProfileStore((state) => state.faculty);
  const now = useNow();
  const event = query.data;
  const result = event
    ? scoreEvent({ interests, faculty, onboarded: true }, event, now)
    : undefined;
  const items = event && result ? [{ event, score: result }] : [];
  const explanations = useExplanations(items);
  return {
    event,
    loading: query.isPending,
    wide: ['lg', 'xl', '2xl'].includes(breakpoint),
    score: result?.score ?? 0,
    explanation: event
      ? (explanations.explanations[event.id] ?? 'Discover something new on campus.')
      : '',
    retry: () => void query.refetch(),
  };
}
