import type { ReactElement } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui';
export interface ShareButtonProps {
  onShare(): void;
}
export function ShareButton({ onShare }: ShareButtonProps): ReactElement {
  return (
    <Button variant="secondary" onClick={onShare}>
      <Share2 size={16} />
      Share
    </Button>
  );
}
