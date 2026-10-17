'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSavedIds, useRsvpStore } from '@/stores';
import type { ScoredEvent } from '@/types';
import { useSavedHydrated, useRsvpHydrated, useProfileHydrated } from './useHasHydrated';
import { useEvents } from './useEvents';
import { useBrowseEvents } from './useBrowseEvents';
import { eventFiltersSchema } from '@/schemas';
import { useNow } from './useNow';
export interface MyEventsBehavior {tab:string;setTab(value:string):void;loading:boolean;error:boolean;retry():void;upcoming:ScoredEvent[];past:ScoredEvent[]}
export function useMyEvents():MyEventsBehavior {const savedHydrated=useSavedHydrated();const rsvpHydrated=useRsvpHydrated();useProfileHydrated();const saved=useSavedIds();const records=useRsvpStore((state)=>state.records);const parameters=useSearchParams();const tab=parameters.get('tab')==='saved'?'saved':'rsvps';const router=useRouter();const query=useEvents();const {items}=useBrowseEvents(query.data??[],eventFiltersSchema.parse({}));const selected=items.filter(({event})=>tab==='saved'?saved.includes(event.id):Boolean(records[event.id]));const now=useNow();return {tab,setTab:(value)=>router.replace(`/my-events?tab=${value}`,{scroll:false}),loading:!savedHydrated||!rsvpHydrated||query.isPending,error:query.isError,retry:()=>void query.refetch(),upcoming:selected.filter(({event})=>Date.parse(event.endTime)>now),past:selected.filter(({event})=>Date.parse(event.endTime)<=now)};}