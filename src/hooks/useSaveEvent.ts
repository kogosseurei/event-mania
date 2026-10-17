'use client';
import { useSavedStore, useToastStore } from '@/stores';
import { useSavedHydrated } from './useHasHydrated';
export interface SaveBehavior {saved:boolean;toggle():void}
export function useSaveEvent(id:string):SaveBehavior {const hydrated=useSavedHydrated();const saved=useSavedStore((state)=>state.savedIds.includes(id));const toggle=useSavedStore((state)=>state.toggle);const push=useToastStore((state)=>state.push);return {saved:hydrated&&saved,toggle:()=>{toggle(id);push({message:saved?'Removed from saved events':'Added to your saved events',tone:'success',actionLabel:'Undo',onAction:()=>{if(saved)useSavedStore.getState().save(id);else useSavedStore.getState().unsave(id);}});}};}