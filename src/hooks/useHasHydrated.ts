'use client';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { useProfileStore, useRsvpStore, useSavedStore } from '@/stores';
interface PersistedStore { persist?:{ hasHydrated():boolean; rehydrate():Promise<void>|void; onFinishHydration(callback:()=>void):()=>void } }
export function useHasHydrated(store:PersistedStore):boolean {
 useEffect(()=>{if(store.persist&&!store.persist.hasHydrated())void store.persist.rehydrate();},[store]);
 const subscribe=useCallback((notify:()=>void)=>store.persist?.onFinishHydration(notify)??(()=>{}),[store]);
 const snapshot=useCallback(()=>store.persist?.hasHydrated()??false,[store]);
 return useSyncExternalStore(subscribe,snapshot,()=>false);
}
export function useProfileHydrated():boolean {return useHasHydrated(useProfileStore);}
export function useSavedHydrated():boolean {return useHasHydrated(useSavedStore);}
export function useRsvpHydrated():boolean {return useHasHydrated(useRsvpStore);}
