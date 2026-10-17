import type { ReactElement } from 'react';
import type { CampusEvent } from '@/types';
import { formatTime } from '@/lib';
export interface AgendaTimelineProps {items:CampusEvent['agenda']}
export function AgendaTimeline({items}:AgendaTimelineProps):ReactElement {return <ol className="agenda-timeline">{items.map((item)=><li key={`${item.time}-${item.label}`}><time dateTime={item.time}>{formatTime(item.time)}</time><span>{item.label}</span></li>)}</ol>;}