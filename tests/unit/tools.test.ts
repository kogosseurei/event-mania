import { describe, expect, it } from 'vitest';
import { toolRegistry, runTool } from '@/server/tools';
describe('read-only MCP registry',()=>{
 for(const tool of toolRegistry)it(`runs ${tool.name}`,async()=>{const result=await runTool(tool,tool.example);expect(result.isError).toBe(false);expect(()=>JSON.parse(result.content[0]?.text??'')).not.toThrow();});
 it('rejects excessive limits',async()=>{const tool=toolRegistry.find((item)=>item.name==='search_events');if(!tool)throw new Error('Missing tool');expect((await runTool(tool,{limit:21})).isError).toBe(true);});
 it('reports unknown IDs',async()=>{const tool=toolRegistry.find((item)=>item.name==='get_event');if(!tool)throw new Error('Missing tool');const result=await runTool(tool,{id:'missing'});expect(result.isError).toBe(true);expect(result.content[0]?.text).toContain('not found');});
 it('returns concise event summaries',async()=>{const tool=toolRegistry[0];if(!tool)throw new Error('Missing tool');const result=await runTool(tool,{limit:1});const events=JSON.parse(result.content[0]?.text??'[]') as {description:string;url:string;spotsLeft:number}[];expect(events[0]?.description.length).toBeLessThanOrEqual(240);expect(events[0]?.url).toContain('/events/');expect(events[0]?.spotsLeft).toBeGreaterThanOrEqual(0);});
});