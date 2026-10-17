'use client';
import type { ReactElement } from 'react';
import { getEventStatus } from '@/lib';
import { useNow } from '@/hooks';
import { Badge } from '@/components/ui';
export interface StatusChipProps {
  startTime: string;
  endTime: string;
}
export function StatusChip({ startTime, endTime }: StatusChipProps): ReactElement | null {
  const now = useNow();
  const status = getEventStatus(startTime, endTime, now);
  return status ? <Badge tone={status.tone}>{status.label}</Badge> : null;
}
