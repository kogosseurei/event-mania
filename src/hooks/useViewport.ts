'use client';
import { useSyncExternalStore } from 'react';
function subscribe(notify:()=>void):()=>void {window.addEventListener('resize',notify);return ()=>window.removeEventListener('resize',notify);}
export function useViewport():string {return useSyncExternalStore(subscribe,()=>`${window.innerWidth} × ${window.innerHeight}`,()=> 'Loading viewport');}