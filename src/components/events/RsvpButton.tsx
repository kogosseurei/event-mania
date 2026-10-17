'use client';
import type { ReactElement } from 'react';
import { useRsvp } from '@/hooks';
import { RsvpButtonView } from './RsvpButtonView';
export interface RsvpButtonProps {
  eventId: string;
}
export function RsvpButton({ eventId }: RsvpButtonProps): ReactElement {
  const behavior = useRsvp(eventId);
  return (
    <RsvpButtonView
      state={behavior.state}
      label={behavior.label}
      disabled={behavior.disabled}
      onPress={() => void behavior.onPress()}
    />
  );
}
