'use client';
import type { ReactElement } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import type { EventFilters } from '@/types';
import { useNaturalSearch } from '@/hooks/useNaturalSearch';
import { Button } from '@/components/ui';
export interface SearchBoxProps {onSearch(filters:Partial<EventFilters>):void}
export function SearchBox({onSearch}:SearchBoxProps):ReactElement {const {query,setQuery,pending,submit}=useNaturalSearch(onSearch);return <form className="search-box" onSubmit={(event)=>void submit(event)}><Search size={20}/><input aria-label="Search campus events" value={query} maxLength={200} onChange={(event)=>setQuery(event.target.value)} placeholder="Find an event, or try ‘music this week’"/><span className="search-ai"><Sparkles size={14}/>Smart search</span><Button type="submit" loading={pending} aria-label="Search events"><ArrowRight size={18}/></Button></form>;}