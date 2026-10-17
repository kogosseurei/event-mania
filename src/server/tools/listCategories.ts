import { categories } from '@/config';
import { eventService } from '../events';
export async function listCategories():Promise<typeof categories> {return eventService.getCategories();}