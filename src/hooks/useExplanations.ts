'use client';
import { useQuery } from '@tanstack/react-query';
import { useProfileStore } from '@/stores';
import { explainerProvider, explainMatch } from '@/matching';
import type { ExplanationMap, ScoredEvent } from '@/types';
export function useExplanations(items: ScoredEvent[]): ExplanationMap {
  const interests = useProfileStore((state) => state.interests);
  const faculty = useProfileStore((state) => state.faculty);
  const profile = { interests, faculty, onboarded: true };
  const fallback: ExplanationMap = {
    source: 'fallback',
    explanations: Object.fromEntries(items.map((item) => [item.event.id, explainMatch(item)])),
  };
  const query = useQuery({
    queryKey: [
      'explanations',
      [...interests].sort(),
      faculty,
      items.map((item) => item.event.id).sort(),
    ],
    queryFn: () => explainerProvider.explainMany(profile, items),
    enabled: items.length > 0,
    staleTime: 86_400_000,
  });
  return query.data ?? fallback;
}
