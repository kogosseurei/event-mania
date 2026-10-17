import { describe, expect, it } from 'vitest';
import { MockEventRepository } from '@/server/events';
import { buildIcs, foldCalendarLine, findConflict, canRsvp, getRsvpState } from '@/lib';
import type { RsvpRecord } from '@/types';
const repository=new MockEventRepository(0);
describe('RSVP rules',()=>{
 it('blocks overlapping Open Mic and Chess Mixer and permits touching boundaries',async()=>{const events=await repository.listEvents();const music=events.find((event)=>event.id==='ev-004');const mixer=events.find((event)=>event.id==='ev-007');if(!music||!mixer)throw new Error('Fixtures missing');const record:RsvpRecord={eventId:music.id,title:music.title,startTime:music.startTime,endTime:music.endTime,createdAt:new Date().toISOString()};expect(findConflict(mixer,[record])?.title).toBe(music.title);expect(canRsvp(mixer,[record])).toBe(false);expect(findConflict({...mixer,startTime:music.endTime},[record])).toBeUndefined();expect(getRsvpState(music,[record])).toBe('going');});
 it('blocks full and past events',async()=>{const events=await repository.listEvents();expect(events.filter((event)=>!canRsvp(event,[])).map((event)=>event.id)).toEqual(['ev-002','ev-010']);});
 it('uses pending priority',async()=>{const event=(await repository.listEvents())[0];if(!event)throw new Error('Missing fixture');expect(getRsvpState(event,[],true)).toBe('pending');});
});
describe('calendar output',()=>{
 it('uses UTC CRLF and escapes text',async()=>{const event=(await repository.listEvents())[0];if(!event)throw new Error('Missing fixture');const text=buildIcs({...event,title:'Hello, world; again',description:'Line one\nLine two'},'Hall, 1');expect(text).toContain('SUMMARY:Hello\\, world\\; again\r\n');expect(text).toContain('LOCATION:Hall\\, 1');expect(text).toContain('DESCRIPTION:Line one\\nLine two');expect(text.replace(/\r\n/g,'')).not.toContain('\n');});
 it('folds at 75 octets without breaking Unicode',()=>{const value='SUMMARY:'+ '🎉'.repeat(100);const folded=foldCalendarLine(value);for(const line of folded.split('\r\n'))expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);expect(folded.replace(/\r\n /g,'')).toBe(value);});
});