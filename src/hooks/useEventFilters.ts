'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { parseEventFilters, serializeEventFilters } from '@/lib';
import { eventFiltersSchema } from '@/schemas';
import type { EventFilters } from '@/types';
export interface FilterBehavior {
  filters: EventFilters;
  update(value: Partial<EventFilters>): void;
  clear(): void;
}
export function useEventFilters(): FilterBehavior {
  const parameters = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  let filters: EventFilters;
  try {
    filters = parseEventFilters(new URLSearchParams(parameters.toString()));
  } catch {
    filters = eventFiltersSchema.parse({});
  }
  return {
    filters,
    update: (value) => {
      const next = eventFiltersSchema.parse({ ...filters, ...value });
      router.replace(`${pathname}?${serializeEventFilters(next)}`, { scroll: false });
    },
    clear: () => router.replace(pathname, { scroll: false }),
  };
}
