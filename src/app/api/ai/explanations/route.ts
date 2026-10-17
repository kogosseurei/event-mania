import { explanationInputSchema } from '@/schemas';
import { explainEvents } from '@/server/ai';
import { allowRequest } from '@/server/cache';
import { handleRoute } from '@/server/http';
export async function POST(request:Request):Promise<Response> {return handleRoute(async()=>{const input=explanationInputSchema.parse(await request.json());if(!allowRequest(request))return {source:'fallback',explanations:Object.fromEntries(input.events.map((event)=>[event.id,event.score.reasons.join(' ')]))};return explainEvents(input);});}