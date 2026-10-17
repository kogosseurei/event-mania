import type { ReactElement } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui';
export interface LoadMoreProps {
  onLoad(): void;
  hasMore: boolean;
}
export function LoadMore({ onLoad, hasMore }: LoadMoreProps): ReactElement {
  return (
    <div className="load-more">
      {hasMore ? (
        <Button variant="secondary" onClick={onLoad}>
          Discover more
          <ArrowDown size={16} />
        </Button>
      ) : (
        <p>You’re all caught up. Your next experience is waiting above.</p>
      )}
    </div>
  );
}
