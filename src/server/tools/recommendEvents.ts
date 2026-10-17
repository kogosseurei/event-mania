import { eventService } from '../events';
import { recommendToolSchema } from './toolSchemas';
import { summarizeEvent, type ToolEvent } from './summarizeEvent';
export async function recommendEvents(input:unknown):Promise<(ToolEvent&{score:number})[]> {const {interests,faculty,limit}=recommendToolSchema.parse(input);const [items,venues]=await Promise.all([eventService.recommendEvents({interests,faculty,onboarded:true},limit),eventService.getVenues()]);return items.map(({event,score})=>({...summarizeEvent(event,venues),score:score.score}));}