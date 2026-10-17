import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageContainer } from '@/components/layout';
import { ErrorState } from '@/components/ui';
export interface EventNotFoundProps {
  retry(): void;
}
export function EventNotFound({ retry }: EventNotFoundProps): ReactElement {
  return (
    <PageContainer>
      <h1>Event not found</h1>
      <Link href="/browse" className="button button-ghost">
        <ArrowLeft size={16} />
        Back to events
      </Link>
      <ErrorState
        message="This event could not be found. It may have been removed."
        retry={retry}
      />
    </PageContainer>
  );
}
