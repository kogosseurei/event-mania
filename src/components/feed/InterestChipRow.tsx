import type { ReactElement } from 'react';
import { Sparkles } from 'lucide-react';
import { interests } from '@/config';
import type { Interest } from '@/types';
import { Chip } from '@/components/ui';
import { InterestIcon } from '@/components/onboarding';
export interface InterestChipRowProps {
  selected: Interest | null;
  onSelect(value: Interest | null): void;
}
export function InterestChipRow({ selected, onSelect }: InterestChipRowProps): ReactElement {
  return (
    <div className="interest-row" aria-label="Narrow your feed">
      <Chip selected={selected === null} onClick={() => onSelect(null)}>
        <Sparkles size={15} />
        For you
      </Chip>
      {interests.map((interest) => (
        <Chip
          key={interest.id}
          selected={selected === interest.id}
          onClick={() => onSelect(selected === interest.id ? null : interest.id)}
        >
          <InterestIcon interest={interest.id} size={15} />
          {interest.label}
        </Chip>
      ))}
    </div>
  );
}
