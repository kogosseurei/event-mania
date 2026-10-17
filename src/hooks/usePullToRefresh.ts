'use client';
import { useRef, type TouchEventHandler } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useReducedMotion } from './useReducedMotion';
export function usePullToRefresh(): {
  onTouchStart: TouchEventHandler;
  onTouchEnd: TouchEventHandler;
} {
  const start = useRef<number | null>(null);
  const client = useQueryClient();
  const reduced = useReducedMotion();
  return {
    onTouchStart: (event) => {
      start.current = !reduced && window.scrollY === 0 ? (event.touches[0]?.clientY ?? null) : null;
    },
    onTouchEnd: (event) => {
      if (start.current !== null && (event.changedTouches[0]?.clientY ?? 0) - start.current > 72)
        void client.invalidateQueries({ queryKey: ['events'] });
      start.current = null;
    },
  };
}
