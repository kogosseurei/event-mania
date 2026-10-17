'use client';
import type { ReactElement } from 'react';
import { Users } from 'lucide-react';
import type { CampusEvent } from '@/types';
import { useEventCapacity } from '@/hooks/useEventCapacity';
import { ProgressBar } from '@/components/ui';
export interface AttendanceMeterProps {event:CampusEvent}
export function AttendanceMeter({event}:AttendanceMeterProps):ReactElement {const {registeredCount,percent,isNearlyFull}=useEventCapacity(event);return <div className="attendance-meter"><div><span><Users size={13}/>{registeredCount} of {event.capacity} going</span>{isNearlyFull&&<span className="nearly-full">{percent>=100?'Full':'Nearly full'}</span>}</div><ProgressBar value={percent} label={`${registeredCount} of ${event.capacity} places filled`} tone={isNearlyFull?'warning':'primary'}/></div>;}