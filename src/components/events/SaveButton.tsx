'use client';
import type { ReactElement } from 'react';
import { Heart } from 'lucide-react';
import { IconButton } from '@/components/ui';
import { useSaveEvent } from '@/hooks';
export interface SaveButtonProps {
  eventId: string;
}
export function SaveButton({ eventId }: SaveButtonProps): ReactElement {
  const { saved, toggle } = useSaveEvent(eventId);
  return (
    <IconButton
      className={`save-button ${saved ? 'is-saved' : ''}`}
      aria-label={saved ? 'Unsave event' : 'Save event'}
      aria-pressed={saved}
      onClick={toggle}
    >
      <Heart size={19} fill={saved ? 'currentColor' : 'none'} />
    </IconButton>
  );
}
