import { describe, expect, it } from 'vitest';
import { MockEventRepository, EventService } from '@/server/events';
import { eventFiltersSchema } from '@/schemas';
import { applyEventFilters, parseEventFilters, serializeEventFilters, getEventStatus } from '@/lib';
import { handleRoute, NotFoundError } from '@/server/http';
const repository = new MockEventRepository(0);
describe('event services', () => {
  it('converts offsets and preserves the intended overlap', async () => {
    const events = await repository.listEvents();
    expect(events).toHaveLength(10);
    const music = events.find((event) => event.id === 'ev-004');
    const mixer = events.find((event) => event.id === 'ev-007');
    expect(Date.parse(mixer?.startTime ?? '')).toBeLessThan(Date.parse(music?.endTime ?? ''));
  });
  it('round trips all URL filters', () => {
    const filters = eventFiltersSchema.parse({
      query: 'music',
      categories: ['music', 'arts'],
      venueIds: ['amphitheatre'],
      datePreset: 'custom',
      from: '2026-10-17T00:00:00.000Z',
      sort: 'popular',
    });
    expect(parseEventFilters(serializeEventFilters(filters))).toEqual(filters);
  });
  it('filters case insensitive title and tags without mutation', async () => {
    const events = await repository.listEvents();
    const original = events.map((event) => event.id);
    expect(applyEventFilters(events, eventFiltersSchema.parse({ query: 'GAMING' }))).toHaveLength(
      2,
    );
    expect(events.map((event) => event.id)).toEqual(original);
  });
  it('returns correct unknown event status', async () => {
    const service = new EventService(repository);
    const response = await handleRoute(() => service.getEventById('missing'));
    expect(response.status).toBe(404);
  });
  it('uses consistent errors', async () => {
    const response = await handleRoute(() => {
      throw new NotFoundError('Missing');
    });
    expect(await response.json()).toEqual({ error: { code: 'NOT_FOUND', message: 'Missing' } });
  });
  it('computes current and past statuses', () => {
    expect(
      getEventStatus(
        '2026-01-01T10:00:00Z',
        '2026-01-01T12:00:00Z',
        Date.parse('2026-01-01T11:00:00Z'),
      )?.label,
    ).toBe('Happening now');
    expect(
      getEventStatus(
        '2026-01-01T10:00:00Z',
        '2026-01-01T12:00:00Z',
        Date.parse('2026-01-01T12:00:00Z'),
      )?.label,
    ).toBe('Past event');
  });
});
it('orders equal scores by the soonest event', async () => {
  const { EventService } = await import('@/server/events');
  const items = await new EventService(new MockEventRepository(0)).recommendEvents(
    { interests: ['careers', 'music'], faculty: null, onboarded: true },
    20,
  );
  const career = items.findIndex((item) => item.event.id === 'ev-005');
  const jazz = items.findIndex((item) => item.event.id === 'ev-009');
  expect(career).toBeGreaterThanOrEqual(0);
  expect(jazz).toBeGreaterThan(career);
});
