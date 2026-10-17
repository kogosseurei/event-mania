'use client';
import type { ReactElement } from 'react';
import { Ticket } from 'lucide-react';
import type { CampusEvent } from '@/types';
import { useEventActions } from '@/hooks';
import { RsvpButton } from './RsvpButton';
import { SaveButton } from './SaveButton';
import { ShareButton } from './ShareButton';
import { AddToCalendarButton } from './AddToCalendarButton';
export interface EventActionsProps {
  event: CampusEvent;
  layout: 'bar' | 'card';
}
export function EventActions({ event, layout }: EventActionsProps): ReactElement {
  const { share, download } = useEventActions(event);
  return (
    <div className={`event-actions actions-${layout}`}>
      {layout === 'card' && (
        <>
          <div className="action-card-title">
            <Ticket size={22} />
            <h2>Make a little room for this.</h2>
          </div>
          <p>Good experiences start with showing up.</p>
          <div className="free-label">
            Free<span>Open to students</span>
          </div>
        </>
      )}
      <RsvpButton eventId={event.id} />
      <div className="secondary-actions">
        <SaveButton eventId={event.id} />
        <ShareButton onShare={() => void share()} />
        <AddToCalendarButton onDownload={download} />
      </div>
      {layout === 'card' && <p className="action-note">Plans change. You can cancel any time.</p>}
    </div>
  );
}
