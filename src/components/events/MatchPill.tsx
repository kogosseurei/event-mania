import type { ReactElement } from 'react';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';
export interface MatchPillProps {
  score: number;
}
export function MatchPill({ score }: MatchPillProps): ReactElement {
  return (
    <Badge tone="success" className="match-pill">
      <Sparkles size={12} />
      {score}% match
    </Badge>
  );
}
