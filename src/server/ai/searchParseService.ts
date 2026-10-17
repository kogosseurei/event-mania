import { z } from 'zod';
import { eventFiltersSchema } from '@/schemas';
import { categories } from '@/config';
import type { EventFilters } from '@/types';
import { generateJson, type GeminiGateway } from './geminiClient';
import { searchPrompt } from './prompts';
export function ruleBasedSearch(query:string):EventFilters {const normalized=query.toLowerCase();const selected=categories.filter((category)=>normalized.includes(category.id)||normalized.includes(category.label.toLowerCase())).map((category)=>category.id);const datePreset=normalized.includes('today')?'today':normalized.includes('week')?'week':normalized.includes('month')?'month':'any';return eventFiltersSchema.parse({query:selected.length||datePreset!=='any'?'':query,categories:selected,datePreset});}
export async function parseNaturalSearch(query:string,gateway:GeminiGateway=generateJson):Promise<EventFilters> {if(/ignore|system prompt|instructions|api.?key/i.test(query))return eventFiltersSchema.parse({query});try{return eventFiltersSchema.parse(await gateway(searchPrompt(query),z.toJSONSchema(eventFiltersSchema),true));}catch{return ruleBasedSearch(query);}}