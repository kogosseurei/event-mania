'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { useProfileStore, useRsvpStore, useSavedStore } from '@/stores';
interface PersistedStore { persist:{ hasHydrated():boolean; rehydrate():Promise<void>|void; onFinishHydration(callback:()=>void):()=>void } }
export function useHasHydrated(store:PersistedStore):boolean { useEffect(()=>{void store.persist.rehydrate();},[store]);return useSyncExternalStore(store.persist.onFinishHydration,store.persist.hasHydrated,()=>false); }
export function useProfileHydrated():boolean {return useHasHydrated(useProfileStore);}
export function useSavedHydrated():boolean {return useHasHydrated(useSavedStore);}
export function useRsvpHydrated():boolean {return useHasHydrated(useRsvpStore);}