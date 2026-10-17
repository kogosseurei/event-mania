'use client';
import { useState } from 'react';
import { PAGE_SIZE } from '@/config';
export interface LoadMoreResult<T> {
  visibleItems: T[];
  hasMore: boolean;
  loadMore(): void;
}
export function useLoadMore<T>(items: T[]): LoadMoreResult<T> {
  const [limit, setLimit] = useState(PAGE_SIZE);
  return {
    visibleItems: items.slice(0, limit),
    hasMore: limit < items.length,
    loadMore: () => setLimit((value) => value + PAGE_SIZE),
  };
}
