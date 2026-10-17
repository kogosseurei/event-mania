import Link from 'next/link';
import type { ReactElement } from 'react';
import { CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';
import { formatDate, formatTime } from '@/lib';
import { university } from '@/config';
import type { CampusEvent } from '@/types';
import { AttendanceMeter } from './AttendanceMeter';
export interface EventCardBodyProps {event:CampusEvent;explanation:string;source:'ai'|'fallback';compact:boolean}
export function EventCardBody({event,explanation,source,compact}:EventCardBodyProps):ReactElement {return <div className="event-body"><h3><Link href={`/events/${event.id}`} className="event-title-link">{event.title}</Link></h3><div className="event-meta"><CalendarDays size={14}/><span>{formatDate(event.startTime)}<span className="meta-dot">·</span>{formatTime(event.startTime)}</span></div><div className="event-meta"><MapPin size={14}/><span>{university.venues.find((venue)=>venue.id===event.venueId)?.name??event.venueId}</span></div>{!compact&&<AttendanceMeter event={event}/>}<div className="event-footer"><p title={explanation}>{source==='ai'&&<span className="ai-tag">AI</span>}{explanation||'A new experience is waiting for you.'}</p><ArrowUpRight size={16}/></div></div>;}