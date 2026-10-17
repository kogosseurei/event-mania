'use client';
import { useState, type FormEvent } from 'react';
import { parseSearch } from '@/api';
import type { EventFilters } from '@/types';
export interface NaturalSearchBehavior {query:string;pending:boolean;setQuery(value:string):void;submit(event:FormEvent):Promise<void>}
export function useNaturalSearch(apply:(filters:Partial<EventFilters>)=>void):NaturalSearchBehavior {const [query,setQuery]=useState('');const [pending,setPending]=useState(false);return {query,pending,setQuery,submit:async(event)=>{event.preventDefault();if(!query.trim()){apply({query:''});return;}setPending(true);try{apply(await parseSearch(query));}catch{apply({query:query.slice(0,200)});}finally{setPending(false);}}};}