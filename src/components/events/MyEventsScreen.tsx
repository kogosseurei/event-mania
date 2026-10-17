'use client';
import type { ReactElement } from 'react';
import { Heart, CalendarCheck } from 'lucide-react';
import { useMyEvents } from '@/hooks';
import { PageContainer, PageHeader } from '@/components/layout';
import { Tabs } from '@/components/ui';
import { EventGrid } from './EventGrid';
import { MyEventList } from './MyEventList';
const tabs = [
  { value: 'rsvps', label: 'Upcoming RSVPs' },
  { value: 'saved', label: 'Saved events' },
];
export function MyEventsScreen(): ReactElement {
  const behavior = useMyEvents();
  const saved = behavior.tab === 'saved';
  const Icon = saved ? Heart : CalendarCheck;
  return (
    <PageContainer>
      <PageHeader
        eyebrow="GOOD PLANS START HERE"
        title="Your plans. All in one place."
        description="The ones you’re going to. The ones you’re thinking about."
      />
      <div className="my-events-banner">
        <Icon size={24} />
        <div>
          <h2>{saved ? 'Keep a little possibility.' : 'Something to look forward to.'}</h2>
          <p>
            {behavior.upcoming.length} {saved ? 'saved experiences' : 'upcoming plans'} on your
            campus calendar
          </p>
        </div>
      </div>
      <Tabs label="My event lists" tabs={tabs} value={behavior.tab} onChange={behavior.setTab} />
      <div className="my-events-content">
        <MyEventList behavior={behavior} />
      </div>
      {behavior.past.length > 0 && (
        <details className="past-events">
          <summary>Past events ({behavior.past.length})</summary>
          <EventGrid items={behavior.past} compact />
        </details>
      )}
    </PageContainer>
  );
}
