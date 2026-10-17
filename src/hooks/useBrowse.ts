'use client';
import { useUiStore } from '@/stores';
import { useEvents } from './useEvents';
import { useBreakpoint } from './useBreakpoint';
import { useProfileHydrated } from './useHasHydrated';
import { useEventFilters, type FilterBehavior } from './useEventFilters';
import { useBrowseEvents } from './useBrowseEvents';
import type { ScoredEvent } from '@/types';
export interface BrowseBehavior extends FilterBehavior {
  items: ScoredEvent[];
  panel: boolean;
  open: boolean;
  setOpen(value: boolean): void;
  loading: boolean;
  error: boolean;
  retry(): void;
}
export function useBrowse(): BrowseBehavior {
  useProfileHydrated();
  const filters = useEventFilters();
  const query = useEvents();
  const { items } = useBrowseEvents(query.data ?? [], filters.filters);
  const breakpoint = useBreakpoint();
  const open = useUiStore((state) => state.filterSheetOpen);
  const setOpen = useUiStore((state) => state.setFilterSheetOpen);
  return {
    ...filters,
    items,
    panel: ['lg', 'xl', '2xl'].includes(breakpoint),
    open,
    setOpen,
    loading: query.isPending,
    error: query.isError,
    retry: () => void query.refetch(),
  };
}
