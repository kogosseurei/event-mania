// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { useProfileStore, useSavedStore, useRsvpStore, useToastStore } from '@/stores';
beforeEach(()=>{localStorage.clear();useProfileStore.getState().reset();useSavedStore.setState({savedIds:[]});useRsvpStore.setState({records:{}});useToastStore.setState({queue:[]});});
describe('client stores',()=>{
 it('requires three interests before completing onboarding',()=>{useProfileStore.getState().setInterests(['tech']);useProfileStore.getState().completeOnboarding();expect(useProfileStore.getState().onboarded).toBe(false);useProfileStore.getState().setInterests(['tech','music','arts']);useProfileStore.getState().completeOnboarding();expect(useProfileStore.getState().onboarded).toBe(true);});
 it('persists data without functions',()=>{useSavedStore.getState().save('ev-001');const value=JSON.parse(localStorage.getItem('campus-events:saved:v1')??'{}');expect(value.state).toEqual({savedIds:['ev-001']});});
 it('hydrates saved events',async()=>{localStorage.setItem('campus-events:saved:v1',JSON.stringify({state:{savedIds:['ev-004']},version:1}));await useSavedStore.persist.rehydrate();expect(useSavedStore.getState().savedIds).toEqual(['ev-004']);});
 it('recovers corrupted old persisted data',async()=>{localStorage.setItem('campus-events:profile:v1',JSON.stringify({state:{interests:['invalid']},version:0}));await useProfileStore.persist.rehydrate();expect(useProfileStore.getState().interests).toEqual([]);});
 it('deduplicates saved IDs',()=>{useSavedStore.getState().save('ev-001');useSavedStore.getState().save('ev-001');expect(useSavedStore.getState().savedIds).toHaveLength(1);});
 it('shows at most three toasts',()=>{for(let index=0;index<5;index++)useToastStore.getState().push({message:'Saved',tone:'success'});expect(useToastStore.getState().queue).toHaveLength(3);});
});