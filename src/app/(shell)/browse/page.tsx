import { Suspense, type ReactElement } from 'react';
import { BrowseScreen } from '@/components/filters';
import { Skeleton } from '@/components/ui';
export default function Browse(): ReactElement {
  return (
    <Suspense
      fallback={
        <main id="main" className="page-container">
          <h1>Browse events</h1>
          <Skeleton shape="block" />
        </main>
      }
    >
      <BrowseScreen />
    </Suspense>
  );
}
