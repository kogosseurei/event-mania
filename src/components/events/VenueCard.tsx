import type { ReactElement } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import type { Venue } from '@/types';
import { CloudImage } from '@/components/ui';
export interface VenueCardProps {venue:Venue}
export function VenueCard({venue}:VenueCardProps):ReactElement {return <div className="venue-card"><CloudImage publicId={venue.photoPublicId} alt={venue.name}/><div><h3><MapPin size={18}/>{venue.name}</h3><p>{venue.description}</p><a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="button button-ghost">Open in maps<ArrowUpRight size={16}/></a></div></div>;}