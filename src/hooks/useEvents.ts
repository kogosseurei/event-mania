'use client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchEvents } from '@/api';
import { QUERY_STALE_MS } from '@/config';
import type { CampusEvent } from '@/types';
export function useEvents(): UseQueryResult<CampusEvent[], Error> {
  return useQuery({ queryKey: ['events'], queryFn: fetchEvents, staleTime: QUERY_STALE_MS });
}
