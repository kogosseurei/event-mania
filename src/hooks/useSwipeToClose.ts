'use client';
import { useRef, type PointerEventHandler } from 'react';
const minimumDistance = 100;
const fastDistance = 30;
const minimumVelocity = 0.6;
export interface SwipeBehavior {
  onPointerDown: PointerEventHandler;
  onPointerUp: PointerEventHandler;
}
export function useSwipeToClose(onClose: () => void): SwipeBehavior {
  const start = useRef({ y: 0, time: 0 });
  return {
    onPointerDown: (event) => {
      start.current = { y: event.clientY, time: Date.now() };
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    onPointerUp: (event) => {
      const distance = event.clientY - start.current.y;
      const elapsed = Math.max(1, Date.now() - start.current.time);
      if (
        distance > minimumDistance ||
        (distance > fastDistance && distance / elapsed > minimumVelocity)
      )
        onClose();
    },
  };
}
