'use client';
import { useSyncExternalStore } from 'react';
import { breakpoints, type Breakpoint } from '@/config';
function subscribe(notify: () => void): () => void {
  const queries = Object.values(breakpoints).map((width) =>
    window.matchMedia(`(min-width: ${width}px)`),
  );
  queries.forEach((query) => query.addEventListener('change', notify));
  return () => queries.forEach((query) => query.removeEventListener('change', notify));
}
function snapshot(): Breakpoint {
  return (
    (Object.entries(breakpoints)
      .reverse()
      .find(([, width]) => window.matchMedia(`(min-width: ${width}px)`).matches)?.[0] as
      Breakpoint | undefined) ?? 'base'
  );
}
export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, snapshot, () => 'base');
}
