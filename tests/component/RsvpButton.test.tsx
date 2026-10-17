// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RsvpButton } from '@/components/events';
import type { RsvpBehavior } from '@/hooks/useRsvp';
const fixture=vi.hoisted(()=>({state:'idle',label:'RSVP',disabled:false,onPress:vi.fn(),conflictingEvent:undefined}));
vi.mock('@/hooks/useRsvp',()=>({useRsvp:()=>fixture}));
afterEach(cleanup);
describe('RSVP button states',()=>{for(const state of ['idle','pending','going','full','conflict'] as const)it(state,()=>{Object.assign(fixture,{state,label:state==='conflict'?'Clashes with Open Mic Night':state,disabled:['pending','full','conflict'].includes(state)} satisfies Partial<RsvpBehavior>);render(<RsvpButton eventId="ev-001"/>);const button=screen.getByRole('button');expect(button.textContent).toContain(fixture.label);expect(button.hasAttribute('disabled')).toBe(fixture.disabled);});});