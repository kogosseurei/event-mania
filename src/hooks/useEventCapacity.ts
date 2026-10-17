'use client';
import { useHasRsvp } from '@/stores';
import type { CampusEvent } from '@/types';
import { useRsvpHydrated } from './useHasHydrated';
export interface EventCapacity {
  registeredCount: number;
  percent: number;
  isFull: boolean;
  isNearlyFull: boolean;
}
export function useEventCapacity(event: CampusEvent): EventCapacity {
  const hydrated = useRsvpHydrated();
  const going = useHasRsvp(event.id);
  const registeredCount = Math.min(
    event.capacity,
    event.registeredCount + (hydrated && going ? 1 : 0),
  );
  const percent = (registeredCount / event.capacity) * 100;
  return {
    registeredCount,
    percent,
    isFull: registeredCount >= event.capacity,
    isNearlyFull: percent > 85,
  };
}
