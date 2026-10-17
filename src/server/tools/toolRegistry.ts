import { z } from 'zod';
import { searchEvents } from './searchEvents';
import { getEvent } from './getEvent';
import { recommendEvents } from './recommendEvents';
import { listVenues } from './listVenues';
import { listCategories } from './listCategories';
import { searchToolSchema, getToolSchema, recommendToolSchema, emptyToolSchema } from './toolSchemas';
export interface ToolDefinition {name:string;title:string;description:string;schema:z.ZodObject<z.ZodRawShape>;example:Record<string,unknown>;handler(input:unknown):Promise<unknown>}
export type ToolResult = {content:{type:'text';text:string}[];isError:boolean};
export const toolAnnotations={readOnlyHint:true,destructiveHint:false,idempotentHint:true,openWorldHint:false};
export const toolRegistry:ToolDefinition[]=[
 {name:'search_events',title:'Search campus events',description:'Filter university events by text, category, venue, and ISO date range.',schema:searchToolSchema,example:{category:'music',limit:5},handler:searchEvents},
 {name:'get_event',title:'Get an event',description:'Read one campus event by its exact ID.',schema:getToolSchema,example:{id:'ev-004'},handler:getEvent},
 {name:'recommend_events',title:'Get personalized recommendations',description:'Rank upcoming campus events by interests and optional faculty.',schema:recommendToolSchema,example:{interests:['tech','music','arts'],limit:5},handler:recommendEvents},
 {name:'list_venues',title:'List campus venues',description:'Read the six university venues and map links.',schema:emptyToolSchema,example:{},handler:listVenues},
 {name:'list_categories',title:'List event categories',description:'Read the six supported campus event categories.',schema:emptyToolSchema,example:{},handler:listCategories},
];
export async function runTool(tool:ToolDefinition,input:unknown):Promise<ToolResult> {try{return {content:[{type:'text',text:JSON.stringify(await tool.handler(tool.schema.parse(input)))}],isError:false};}catch(error){return {content:[{type:'text',text:error instanceof z.ZodError?error.issues.map((issue)=>issue.message).join('; '):error instanceof Error?error.message:'Unable to query events'}],isError:true};}}