'use client';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchVenues } from '@/api';
import type { Venue } from '@/types';
export function useVenues(): UseQueryResult<Venue[], Error> {
  return useQuery({ queryKey: ['venues'], queryFn: fetchVenues, staleTime: Infinity });
}
