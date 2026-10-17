import type { ReactElement } from 'react';
import { interests, MINIMUM_INTERESTS } from '@/config';
import type { Interest } from '@/types';
import { Chip } from '@/components/ui';
import { InterestIcon } from './InterestIcon';
export interface InterestPickerProps {
  selected: Interest[];
  onToggle(interest: Interest): void;
}
export function InterestPicker({ selected, onToggle }: InterestPickerProps): ReactElement {
  return (
    <div>
      <div className="interest-picker" role="group" aria-label="Your interests">
        {interests.map((interest) => (
          <Chip
            key={interest.id}
            selected={selected.includes(interest.id)}
            onClick={() => onToggle(interest.id)}
          >
            <InterestIcon interest={interest.id} />
            {interest.label}
          </Chip>
        ))}
      </div>
      <p className="interest-counter" aria-live="polite">
        {selected.length < MINIMUM_INTERESTS
          ? `${selected.length} of ${MINIMUM_INTERESTS} selected`
          : `${selected.length} interests selected. Looking good!`}
      </p>
    </div>
  );
}
