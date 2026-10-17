import 'server-only';
import { GoogleGenAI } from '@google/genai';
import { readServerEnvironment } from '@/lib';
import { AI_TIMEOUT_MS } from '@/config';
export type GeminiGateway=(prompt:string,schema:Record<string,unknown>,smart?:boolean)=>Promise<unknown>;
let client:GoogleGenAI|undefined;
export const generateJson:GeminiGateway=async(prompt,schema,smart=false)=>{const environment=readServerEnvironment();if(!environment.GEMINI_API_KEY)throw new Error('AI is not configured');client??=new GoogleGenAI({apiKey:environment.GEMINI_API_KEY});const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;try{const timeout=new Promise<never>((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('AI timeout'));},AI_TIMEOUT_MS);});const response=await Promise.race([client.models.generateContent({model:smart?environment.GEMINI_MODEL_SMART:environment.GEMINI_MODEL_FAST,contents:prompt,config:{responseMimeType:'application/json',responseJsonSchema:schema,abortSignal:controller.signal}}),timeout]);return JSON.parse(response.text??'null') as unknown;}finally{clearTimeout(timer);}};