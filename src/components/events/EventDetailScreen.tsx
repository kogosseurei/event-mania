'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEventDetail } from '@/hooks';
import { PageContainer, StickyActionBar } from '@/components/layout';
import { CloudImage, Skeleton } from '@/components/ui';
import { EventDetailLayout } from './EventDetailLayout';
import { EventDetailContent } from './EventDetailContent';
import { EventActions } from './EventActions';
import { EventNotFound } from './EventNotFound';
export interface EventDetailScreenProps {
  id: string;
}
export function EventDetailScreen({ id }: EventDetailScreenProps): ReactElement {
  const { event, loading, wide, score, explanation, retry } = useEventDetail(id);
  if (loading)
    return (
      <PageContainer>
        <Skeleton shape="block" />
        <Skeleton />
        <Skeleton />
      </PageContainer>
    );
  if (!event) return <EventNotFound retry={retry} />;
  const hero = (
    <CloudImage
      publicId={event.coverPublicId}
      alt={`${event.title} event artwork`}
      priority
      sizes="100vw"
    />
  );
  const main = <EventDetailContent event={event} score={score} explanation={explanation} />;
  const aside = wide ? <EventActions event={event} layout="card" /> : null;
  const bar = wide ? null : (
    <StickyActionBar>
      <EventActions event={event} layout="bar" />
    </StickyActionBar>
  );
  return (
    <PageContainer className="detail-page">
      <Link href="/browse" className="back-link">
        <ArrowLeft size={16} />
        Back to discovery
      </Link>
      <EventDetailLayout hero={hero} main={main} aside={aside} bar={bar} />
    </PageContainer>
  );
}
