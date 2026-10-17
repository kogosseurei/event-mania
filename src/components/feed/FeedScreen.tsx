'use client';
import type { ReactElement } from 'react';
import { useFeed } from '@/hooks';
import { PageContainer, PageHeader } from '@/components/layout';
import { OnboardingGate } from '@/components/onboarding';
import { InterestChipRow } from './InterestChipRow';
import { PullToRefresh } from './PullToRefresh';
import { FeedResults } from './FeedResults';
export function FeedScreen(): ReactElement {
  const behavior = useFeed();
  return (
    <OnboardingGate>
      <PageContainer>
        <PageHeader
          eyebrow="GOOD THINGS HAPPEN HERE"
          title="Your campus. Your kind of events."
          description="A little discovery. A lot of possibility. All picked for you."
        />
        <InterestChipRow selected={behavior.active} onSelect={behavior.select} />
        <PullToRefresh>
          <FeedResults behavior={behavior} />
        </PullToRefresh>
        <div className="feed-footnote">
          <span className="status-dot" />
          Made for your interests. Open to new possibilities.
        </div>
      </PageContainer>
    </OnboardingGate>
  );
}
