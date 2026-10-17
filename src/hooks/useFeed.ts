'use client';
import { useState } from 'react';
import type { CampusEvent, ExplanationMap, Interest, ScoredEvent } from '@/types';
import { useEvents } from './useEvents';
import { useMatchedEvents } from './useMatchedEvents';
import { useExplanations } from './useExplanations';
import { useLoadMore } from './useLoadMore';
export interface FeedBehavior {
  active: Interest | null;
  select(value: Interest | null): void;
  loading: boolean;
  error: boolean;
  retry(): void;
  featured: ScoredEvent | undefined;
  items: ScoredEvent[];
  explanations: ExplanationMap;
  hasMore: boolean;
  loadMore(): void;
}
const emptyEvents: CampusEvent[] = [];
export function useFeed(): FeedBehavior {
  const [active, select] = useState<Interest | null>(null);
  const query = useEvents();
  const { items } = useMatchedEvents(query.data ?? emptyEvents, active);
  const explanations = useExplanations(items);
  const loaded = useLoadMore(items.slice(1));
  return {
    active,
    select,
    loading: query.isPending,
    error: query.isError,
    retry: () => void query.refetch(),
    featured: items[0],
    items: loaded.visibleItems,
    explanations,
    hasMore: loaded.hasMore,
    loadMore: loaded.loadMore,
  };
}
