import { createMcpHandler } from 'mcp-handler';
import { university } from '@/config';
import { toolRegistry, toolAnnotations, runTool } from '@/server/tools';
import { allowRequest } from '@/server/cache';
import { jsonResponse } from '@/server/http';
export const maxDuration=60;
const mcpHandler=createMcpHandler((server)=>{for(const tool of toolRegistry)server.registerTool(tool.name,{title:tool.title,description:tool.description,inputSchema:tool.schema,annotations:toolAnnotations},async(input)=>runTool(tool,input));},{serverInfo:{name:`${university.name} Events`,version:'1.0.0'}});
async function handler(request:Request):Promise<Response> {if(!allowRequest(request))return jsonResponse({error:{code:'RATE_LIMITED',message:'Too many requests. Please try again shortly.'}},429);return mcpHandler(request);}
export {handler as GET,handler as POST,handler as DELETE};