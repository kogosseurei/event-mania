import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { z } from 'zod';
import { rsvpRecordSchema } from '@/schemas';
import type { RsvpRecord } from '@/types';
const persistedSchema = z.object({records:z.record(z.string(),rsvpRecordSchema)});
interface RsvpState { records: Record<string,RsvpRecord>; add(record: RsvpRecord): void; remove(id: string): void }
export const useRsvpStore = create<RsvpState>()(persist((set) => ({ records: {}, add: (record) => set((state) => ({ records: {...state.records,[record.eventId]:record} })), remove: (id) => set((state) => ({records:Object.fromEntries(Object.entries(state.records).filter(([key])=>key!==id))})) }), { name:'campus-events:rsvp:v1',version:1, storage:createJSONStorage(()=>localStorage),skipHydration:true,partialize:({records})=>({records}),migrate:(value)=>persistedSchema.safeParse(value).data??{records:{}},merge:(persisted,current)=>({...current,...(persistedSchema.safeParse(persisted).data??{records:{}})}) }));
export function useHasRsvp(id: string): boolean { return useRsvpStore((state)=>Boolean(state.records[id])); }