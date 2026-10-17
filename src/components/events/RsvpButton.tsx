'use client';
import type { ReactElement } from 'react';
import { Check, Ticket } from 'lucide-react';
import { Button } from '@/components/ui';
import { useRsvp } from '@/hooks/useRsvp';
export interface RsvpButtonProps {eventId:string}
export function RsvpButton({eventId}:RsvpButtonProps):ReactElement {const {state,label,disabled,onPress}=useRsvp(eventId);return <Button className={`rsvp-button rsvp-${state}`} loading={state==='pending'} variant={state==='going'?'secondary':'primary'} disabled={disabled} onClick={()=>void onPress()}>{state==='going'?<Check size={17}/>:<Ticket size={17}/>}<span>{label}</span></Button>;}