'use client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchEvent } from '@/api';
import { QUERY_STALE_MS } from '@/config';
import type { CampusEvent } from '@/types';
export function useEvent(id: string): UseQueryResult<CampusEvent, Error> {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => fetchEvent(id),
    staleTime: QUERY_STALE_MS,
    retry: false,
  });
}
