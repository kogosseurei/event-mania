import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import rawEvents from '@/data/events.stub.json';
import {
  rawEventSchema,
  studentProfileSchema,
  eventFiltersSchema,
  rsvpRecordSchema,
  venueSchema,
} from '@/schemas';
import { university } from '@/config';
describe('domain schemas', () => {
  it('validates exactly ten raw events', () => {
    expect(z.array(rawEventSchema).length(10).parse(rawEvents)).toHaveLength(10);
  });
  it('rejects invalid capacity', () => {
    expect(rawEventSchema.safeParse({ ...rawEvents[0], capacity: -1 }).success).toBe(false);
  });
  it('validates configured venues', () => {
    expect(z.array(venueSchema).parse(university.venues)).toHaveLength(6);
  });
  it('rejects unknown interests', () => {
    expect(
      studentProfileSchema.safeParse({ interests: ['unknown'], faculty: null, onboarded: false })
        .success,
    ).toBe(false);
  });
  it('rejects malformed RSVP timestamps', () => {
    expect(
      rsvpRecordSchema.safeParse({
        eventId: '1',
        title: 'x',
        startTime: 'tomorrow',
        endTime: 'later',
        createdAt: 'now',
      }).success,
    ).toBe(false);
  });
  it('supplies filter defaults and rejects invalid categories', () => {
    expect(eventFiltersSchema.parse({}).sort).toBe('soonest');
    expect(eventFiltersSchema.safeParse({ categories: ['unknown'] }).success).toBe(false);
  });
});
