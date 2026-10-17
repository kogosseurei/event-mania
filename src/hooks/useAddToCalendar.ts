'use client';
import { buildIcs } from '@/lib';
import type { CampusEvent } from '@/types';
export function useAddToCalendar(event:CampusEvent,venue:string):{download():void} {return {download:()=>{const url=URL.createObjectURL(new Blob([buildIcs(event,venue)],{type:'text/calendar;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download=`${event.id}.ics`;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}};}