import type { ReactElement } from 'react';
import { Check, Ticket } from 'lucide-react';
import { Button } from '@/components/ui';
import type { RsvpState } from '@/lib';
export interface RsvpButtonViewProps {
  state: RsvpState;
  label: string;
  disabled: boolean;
  onPress(): void;
}
export function RsvpButtonView({
  state,
  label,
  disabled,
  onPress,
}: RsvpButtonViewProps): ReactElement {
  return (
    <Button
      className={`rsvp-button rsvp-${state}`}
      loading={state === 'pending'}
      variant={state === 'going' ? 'secondary' : 'primary'}
      disabled={disabled}
      onClick={onPress}
    >
      {state === 'going' ? <Check size={17} /> : <Ticket size={17} />}
      <span>{label}</span>
    </Button>
  );
}
