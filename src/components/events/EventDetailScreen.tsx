'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock, Users } from 'lucide-react';
import { useEvent, useBreakpoint } from '@/hooks';
import { useMatchedEvents } from '@/hooks/useMatchedEvents';
import { useExplanations } from '@/hooks/useExplanations';
import { university } from '@/config';
import { formatDate, formatTime } from '@/lib';
import { PageContainer, StickyActionBar } from '@/components/layout';
import { CloudImage, Badge, Section, Skeleton, ErrorState } from '@/components/ui';
import { EventDetailLayout } from './EventDetailLayout';
import { EventActions } from './EventActions';
import { CategoryBadge } from './CategoryBadge';
import { MatchPill } from './MatchPill';
import { AttendanceMeter } from './AttendanceMeter';
import { AgendaTimeline } from './AgendaTimeline';
import { VenueCard } from './VenueCard';
export interface EventDetailScreenProps {id:string}
export function EventDetailScreen({id}:EventDetailScreenProps):ReactElement {const query=useEvent(id);const breakpoint=useBreakpoint();const {items}=useMatchedEvents(query.data?[query.data]:[]);const explanation=useExplanations(items);const event=query.data;if(query.isPending)return <PageContainer><Skeleton shape="block"/><Skeleton/><Skeleton/></PageContainer>;if(!event)return <PageContainer><Link href="/browse" className="button button-ghost"><ArrowLeft size={16}/>Back to events</Link><ErrorState message="This event could not be found. It may have been removed." retry={()=>void query.refetch()}/></PageContainer>;const venue=university.venues.find((item)=>item.id===event.venueId);const wide=['lg','xl','2xl'].includes(breakpoint);return <PageContainer className="detail-page"><Link href="/browse" className="back-link"><ArrowLeft size={16}/>Back to discovery</Link><EventDetailLayout hero={<CloudImage publicId={event.coverPublicId} alt={`${event.title} event artwork`} priority/>} main={<><div className="flow detail-badges"><CategoryBadge category={event.category}/>{items[0]&&<MatchPill score={items[0].score.score}/>}</div><h1>{event.title}</h1><p className="detail-explanation">{explanation.explanations[event.id]??'There’s something good happening on campus.'}</p><div className="detail-facts"><div><CalendarDays size={21}/><span>{formatDate(event.startTime)}<small>{formatTime(event.startTime)} – {formatTime(event.endTime)}</small></span></div><div><Clock size={21}/><span>{Math.round((Date.parse(event.endTime)-Date.parse(event.startTime))/60000)} minutes<small>Make some time for yourself</small></span></div><div><Users size={21}/><span>{event.organizer}<small>{event.faculty??'Open to all faculties'}</small></span></div></div><Section title="A little about the event"><p className="detail-description">{event.description}</p></Section><AttendanceMeter event={event}/><Section title="Here’s the plan"><AgendaTimeline items={event.agenda}/></Section>{venue&&<Section title="Find your way"><VenueCard venue={venue}/></Section>}<div className="flow">{event.tags.map((tag)=><Badge key={tag}>{tag}</Badge>)}</div></>} aside={wide?<EventActions event={event} layout="card"/>:null} bar={!wide?<StickyActionBar><EventActions event={event} layout="bar"/></StickyActionBar>:null}/></PageContainer>;}