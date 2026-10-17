'use client';
import type { ReactElement } from 'react';
import { useEvents, useBrowseEvents } from '@/hooks';
import { eventFiltersSchema } from '@/schemas';
import { ResponsiveGrid } from '@/components/layout';
import { EventCard, EventCardSkeleton, RsvpButtonView } from '@/components/events';
import { Section } from '@/components/ui';
const states = [
  { state: 'idle', label: 'RSVP', disabled: false },
  { state: 'pending', label: 'Reserving', disabled: true },
  { state: 'going', label: 'Going, tap to cancel', disabled: false },
  { state: 'full', label: 'Event full', disabled: true },
  { state: 'conflict', label: 'Clashes with Open Mic Night', disabled: true },
] as const;
export function EventGallery(): ReactElement {
  const query = useEvents();
  const { items } = useBrowseEvents(query.data ?? [], eventFiltersSchema.parse({}));
  const first = items.find((item) => item.event.id === 'ev-001');
  return (
    <>
      <Section title="All five RSVP states">
        <div className="flow">
          {states.map((item) => (
            <RsvpButtonView key={item.state} {...item} onPress={() => {}} />
          ))}
        </div>
      </Section>
      <Section title="Default, full, and past event cards">
        <ResponsiveGrid>
          {items
            .filter((item) => ['ev-001', 'ev-002', 'ev-010'].includes(item.event.id))
            .map((item) => (
              <EventCard key={item.event.id} {...item} explanation="A new experience on campus." />
            ))}
          <EventCardSkeleton />
        </ResponsiveGrid>
      </Section>
      {first && (
        <>
          <Section title="Compact card">
            <EventCard {...first} explanation="Matches your interests." variant="compact" />
          </Section>
          <Section title="Featured card">
            <EventCard
              {...first}
              explanation="Your next great campus experience."
              variant="featured"
            />
          </Section>
        </>
      )}
    </>
  );
}
