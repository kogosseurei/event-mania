'use client';
import type { KeyboardEvent } from 'react';
export function useTabs(
  values: string[],
  value: string,
  onChange: (value: string) => void,
): { onKeyDown(event: KeyboardEvent<HTMLDivElement>): void } {
  return {
    onKeyDown: (event) => {
      const movement = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!movement && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      const index =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? values.length - 1
            : (values.indexOf(value) + movement + values.length) % values.length;
      const next = values[index];
      if (next) {
        onChange(next);
        event.currentTarget.querySelectorAll<HTMLButtonElement>('[role=tab]')[index]?.focus();
      }
    },
  };
}
