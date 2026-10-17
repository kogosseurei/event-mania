'use client';
import { university } from '@/config';
import type { CampusEvent } from '@/types';
import { useShare } from './useShare';
import { useAddToCalendar } from './useAddToCalendar';
export function useEventActions(event:CampusEvent):{share():Promise<void>;download():void} {const {share}=useShare(event.id,event.title);const {download}=useAddToCalendar(event,university.venues.find((venue)=>venue.id===event.venueId)?.name??event.venueId);return {share,download};}