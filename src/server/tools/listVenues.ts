import type { Venue } from '@/types';
import { eventService } from '../events';
export async function listVenues():Promise<Venue[]> {return eventService.getVenues();}