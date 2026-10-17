'use client';
import { useEffect, type RefObject } from 'react';
const focusableSelector =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]';
export function useFocusTrap(reference: RefObject<HTMLElement | null>, enabled: boolean): void {
  useEffect(() => {
    const container = reference.current;
    if (!enabled || !container) return;
    const listener = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    container.addEventListener('keydown', listener);
    return () => container.removeEventListener('keydown', listener);
  }, [reference, enabled]);
}
