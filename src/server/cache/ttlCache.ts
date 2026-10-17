import { CACHE_TTL_MS } from '@/config';
export interface CacheStore<T> {get(key:string):T|undefined;set(key:string,value:T):void;clear():void}
// Serverless instances do not share memory; replace this store with KV for a shared cache.
export class TtlCache<T> implements CacheStore<T> {
 private readonly values=new Map<string,{value:T;expires:number}>();
 constructor(private readonly ttl:number=CACHE_TTL_MS,private readonly clock:()=>number=Date.now){}
 get(key:string):T|undefined {const entry=this.values.get(key);if(!entry)return undefined;if(entry.expires<=this.clock()){this.values.delete(key);return undefined;}return entry.value;}
 set(key:string,value:T):void {for(const [id,entry] of this.values)if(entry.expires<=this.clock())this.values.delete(id);if(this.values.size>=2000){const oldest=this.values.keys().next().value;if(oldest)this.values.delete(oldest);}this.values.set(key,{value,expires:this.clock()+this.ttl});}
 clear():void {this.values.clear();}
}