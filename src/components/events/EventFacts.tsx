import type { ReactElement } from 'react';
import { CalendarDays, Clock, Users } from 'lucide-react';
import { formatDate, formatTime } from '@/lib';
import type { CampusEvent } from '@/types';
export interface EventFactsProps {
  event: CampusEvent;
}
export function EventFacts({ event }: EventFactsProps): ReactElement {
  const facts = [
    {
      icon: CalendarDays,
      title: formatDate(event.startTime),
      detail: `${formatTime(event.startTime)} – ${formatTime(event.endTime)}`,
    },
    {
      icon: Clock,
      title: `${Math.round((Date.parse(event.endTime) - Date.parse(event.startTime)) / 60000)} minutes`,
      detail: 'Make some time for yourself',
    },
    { icon: Users, title: event.organizer, detail: event.faculty ?? 'Open to all faculties' },
  ];
  return (
    <div className="detail-facts">
      {facts.map(({ icon: Icon, title, detail }) => (
        <div key={title}>
          <Icon size={21} />
          <span>
            {title}
            <small>{detail}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
