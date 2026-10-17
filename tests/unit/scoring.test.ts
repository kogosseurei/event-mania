import { describe, expect, it } from 'vitest';
import { scoreEvent } from '@/matching';
import type { CampusEvent, StudentProfile } from '@/types';
const now = Date.parse('2026-10-17T00:00:00Z');
const profile: StudentProfile = {interests:['tech'],faculty:null,onboarded:true};
const event: CampusEvent = { id:'x',title:'x',description:'x',category:'tech',tags:[],startTime:new Date(now+7*86400000).toISOString(),endTime:new Date(now+8*86400000).toISOString(),venueId:'x',organizer:'x',faculty:null,capacity:10,registeredCount:0,coverPublicId:'x',agenda:[] };
describe('matching', () => {
 it('scores category only',()=>{expect(scoreEvent(profile,event,now).score).toBe(45);});
 it('scores tags only',()=>{expect(scoreEvent(profile,{...event,category:'music',tags:['tech']},now).score).toBe(15);});
 it('scores both',()=>{expect(scoreEvent(profile,{...event,tags:['tech']},now).score).toBe(60);});
 it('caps tags',()=>{expect(scoreEvent({...profile,interests:['tech','gaming','entrepreneurship']},{...event,tags:['tech','gaming','entrepreneurship']},now).score).toBe(80);});
 it('decays proximity',()=>{expect(scoreEvent(profile,{...event,startTime:new Date(now).toISOString()},now).score).toBe(55);});
 it('adds faculty match',()=>{expect(scoreEvent({...profile,faculty:'Engineering'},{...event,faculty:'Engineering'},now).score).toBe(55);});
 it('ignores null faculty',()=>{expect(scoreEvent(profile,event,now).score).toBe(45);});
 it('zeros past events',()=>{expect(scoreEvent(profile,{...event,startTime:new Date(now-2000).toISOString(),endTime:new Date(now-1000).toISOString()},now).score).toBe(0);});
 it('allows empty interests',()=>{expect(scoreEvent({...profile,interests:[]},event,now).score).toBe(0);});
 it('clamps at 100',()=>{expect(scoreEvent({...profile,faculty:'Engineering',interests:['tech','gaming','entrepreneurship']},{...event,faculty:'Engineering',tags:['tech','gaming','entrepreneurship'],startTime:new Date(now).toISOString()},now).score).toBe(100);});
 it('does not mutate inputs',()=>{const original=JSON.stringify(event);scoreEvent(profile,event,now);expect(JSON.stringify(event)).toBe(original);});
});