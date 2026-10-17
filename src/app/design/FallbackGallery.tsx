'use client';
import type { ReactElement } from 'react';
import { Section, Button, EmptyState, ErrorState } from '@/components/ui';
import { useToastStore } from '@/stores';
export function FallbackGallery(): ReactElement {
  const push = useToastStore((state) => state.push);
  return (
    <Section title="Empty and error states">
      <EmptyState
        title="Nothing here yet"
        description="Try changing a filter."
        action={<Button>Explore</Button>}
      />
      <ErrorState retry={() => push({ message: 'Retry action activated', tone: 'info' })} />
    </Section>
  );
}
