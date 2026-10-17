import type { ReactElement } from 'react';
import type { ExplanationMap, ScoredEvent } from '@/types';
import { ResponsiveGrid } from '@/components/layout';
import { EventCard } from './EventCard';
import { EventCardSkeleton } from './EventCardSkeleton';
export interface EventGridProps {items:ScoredEvent[];explanations?:ExplanationMap;loading?:boolean;reduceColumns?:boolean;compact?:boolean}
export function EventGrid({items,explanations,loading=false,reduceColumns=false,compact=false}:EventGridProps):ReactElement {return <ResponsiveGrid reduceColumns={reduceColumns} className={compact?'compact-grid':''}>{loading?Array.from({length:6},(_,index)=><EventCardSkeleton key={index}/>):items.map(({event,score})=><EventCard key={event.id} event={event} score={score} explanation={explanations?.explanations[event.id]??score.reasons[0]??''} source={explanations?.source??'fallback'} variant={compact?'compact':'default'}/>)}</ResponsiveGrid>;}