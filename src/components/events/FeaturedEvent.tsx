import type { ReactElement } from 'react';
import { Sparkles } from 'lucide-react';
import type { ScoredEvent } from '@/types';
import { EventCard } from './EventCard';
export interface FeaturedEventProps {item:ScoredEvent;explanation:string}
export function FeaturedEvent({item,explanation}:FeaturedEventProps):ReactElement {return <section className="featured-section"><div className="section-heading"><h2><Sparkles size={17}/> Your top pick</h2><span>Handpicked for your interests</span></div><EventCard event={item.event} score={item.score} explanation={explanation} variant="featured"/></section>;}