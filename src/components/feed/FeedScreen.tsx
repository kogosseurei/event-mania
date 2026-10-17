'use client';
import { useState, type ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { useEvents, useLoadMore } from '@/hooks';
import { useMatchedEvents } from '@/hooks/useMatchedEvents';
import { useExplanations } from '@/hooks/useExplanations';
import type { CampusEvent, Interest } from '@/types';
import { PageContainer, PageHeader } from '@/components/layout';
import { EventGrid, FeaturedEvent } from '@/components/events';
import { EmptyState, ErrorState } from '@/components/ui';
import { OnboardingGate } from '@/components/onboarding';
import { InterestChipRow } from './InterestChipRow';
import { LoadMore } from './LoadMore';
import { PullToRefresh } from './PullToRefresh';
const emptyEvents:CampusEvent[]=[];
export function FeedScreen():ReactElement {const [active,setActive]=useState<Interest|null>(null);const query=useEvents();const {items}=useMatchedEvents(query.data??emptyEvents,active);const explanations=useExplanations(items);const {visibleItems,hasMore,loadMore}=useLoadMore(items.slice(1));const featured=items[0];return <OnboardingGate><PageContainer><PageHeader eyebrow="GOOD THINGS HAPPEN HERE" title="Your campus. Your kind of events." description="A little discovery. A lot of possibility. All picked for you."/><InterestChipRow selected={active} onSelect={setActive}/><PullToRefresh>{query.isError?<ErrorState retry={()=>void query.refetch()}/>:query.isPending?<EventGrid items={[]} loading/>:featured?<><FeaturedEvent item={featured} explanation={explanations.explanations[featured.event.id]??''}/><div className="section-heading feed-heading"><div><h2>More your kind of thing</h2><p>Good plans, great people, and something new.</p></div><Link href="/browse">View all events<ArrowRight size={15}/></Link></div><EventGrid items={visibleItems} explanations={explanations}/><LoadMore onLoad={loadMore} hasMore={hasMore}/></>:<EmptyState title="A world beyond your usual" description="No matches just yet. Explore every event or try a different interest." action={<Link href="/browse" className="button button-primary"><Compass size={18}/>Browse events</Link>}/>}</PullToRefresh><div className="feed-footnote"><span className="status-dot"/> Made for your interests. Open to new possibilities.</div></PageContainer></OnboardingGate>;}