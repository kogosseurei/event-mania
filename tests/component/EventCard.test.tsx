// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { EventCard } from '@/components/events';
import { MockEventRepository } from '@/server/events';
import { scoreEvent } from '@/matching';
afterEach(cleanup);
describe('EventCard', () => {
  for (const variant of ['default', 'compact', 'featured'] as const)
    it(`renders ${variant} with separate links and save control`, async () => {
      const event = (await new MockEventRepository(0).listEvents())[0];
      if (!event) throw new Error('Fixture missing');
      render(
        <EventCard
          event={event}
          score={scoreEvent(
            { interests: ['tech'], faculty: null, onboarded: true },
            event,
            Date.now(),
          )}
          explanation="Matches technology"
          variant={variant}
        />,
      );
      expect(screen.getByRole('link', { name: event.title }).getAttribute('href')).toBe(
        '/events/ev-001',
      );
      expect(screen.getByRole('button', { name: 'Save event' }).closest('a')).toBeNull();
    });
});
for (const id of ['ev-002', 'ev-010'])
  it(`renders full or past state ${id}`, async () => {
    const event = (await new MockEventRepository(0).listEvents()).find((item) => item.id === id);
    if (!event) throw new Error('Missing fixture');
    render(
      <EventCard
        event={event}
        score={scoreEvent(
          { interests: ['tech'], faculty: null, onboarded: true },
          event,
          Date.now(),
        )}
        explanation="Campus event"
      />,
    );
    expect(screen.getByRole('link', { name: event.title })).toBeTruthy();
    if (id === 'ev-002') expect(screen.getByText('Full')).toBeTruthy();
    else expect(screen.getByText('Past event')).toBeTruthy();
  });
