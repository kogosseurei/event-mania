import type { ReactElement } from 'react';
import type { Metadata } from 'next';
import { eventOgImage } from '@/lib';
import { eventService } from '@/server/events';
import { EventDetailScreen } from '@/components/events';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const event = await eventService.getEventById((await params).id);
    const images = [eventOgImage(event.coverPublicId)];
    return {
      title: `${event.title} | Campus Events`,
      description: event.description,
      openGraph: { title: event.title, description: event.description, images },
      twitter: { card: 'summary_large_image', title: event.title, images },
    };
  } catch {
    return { title: 'Event not found | Campus Events' };
  }
}
export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  return <EventDetailScreen id={(await params).id} />;
}
