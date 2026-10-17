'use client';
import type { ReactElement } from 'react';
import { useBreakpoint } from '@/hooks';
import { useViewport } from '@/hooks';
import { AppShell } from './AppShell';
import { PageContainer } from './PageContainer';
import { ResponsiveGrid } from './ResponsiveGrid';
export function LayoutReview(): ReactElement {
  const breakpoint = useBreakpoint();
  const viewport = useViewport();
  return (
    <AppShell>
      <PageContainer>
        <h1>Layout review</h1>
        <p>
          {breakpoint} · {viewport}
        </p>
        <ResponsiveGrid>
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="review-box">
              {index + 1}
            </div>
          ))}
        </ResponsiveGrid>
      </PageContainer>
    </AppShell>
  );
}
