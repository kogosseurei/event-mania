'use client';
import type { ReactElement, ReactNode } from 'react';
import { useOnboardingGate } from '@/hooks';
import { EventGrid } from '@/components/events';
export interface OnboardingGateProps {
  children: ReactNode;
}
export function OnboardingGate({ children }: OnboardingGateProps): ReactElement {
  const { ready } = useOnboardingGate();
  return ready ? (
    <>{children}</>
  ) : (
    <div className="page-container">
      <EventGrid items={[]} loading />
    </div>
  );
}
