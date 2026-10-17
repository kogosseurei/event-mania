'use client';
import { useSyncExternalStore } from 'react';
import { MINUTE_MS } from '@/config';
let current=Date.now();let timer:ReturnType<typeof setInterval>|undefined;const listeners=new Set<()=>void>();
function subscribe(listener:()=>void):()=>void {listeners.add(listener);if(!timer){current=Date.now();timer=setInterval(()=>{current=Date.now();listeners.forEach((notify)=>notify());},MINUTE_MS);}return ()=>{listeners.delete(listener);if(!listeners.size){clearInterval(timer);timer=undefined;}};}
export function useNow():number {return useSyncExternalStore(subscribe,()=>current,()=>0);}