'use client';
import type { ReactElement } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/layout';
import { Button, EmptyState, ErrorState } from '@/components/ui';
import { EventGrid } from '@/components/events';
import { useEvents, useBreakpoint, useProfileHydrated } from '@/hooks';
import { useEventFilters } from '@/hooks/useEventFilters';
import { useBrowseEvents } from '@/hooks/useBrowseEvents';
import { useUiStore } from '@/stores';
import type { EventFilters } from '@/types';
import { FilterPanel } from './FilterPanel';
import { FilterSheet } from './FilterSheet';
import { ActiveFilterChips } from './ActiveFilterChips';
import { SearchBox } from './SearchBox';
export function BrowseScreen():ReactElement {useProfileHydrated();const {filters,update,clear}=useEventFilters();const query=useEvents();const {items}=useBrowseEvents(query.data??[],filters);const breakpoint=useBreakpoint();const panel=['lg','xl','2xl'].includes(breakpoint);const open=useUiStore((state)=>state.filterSheetOpen);const setOpen=useUiStore((state)=>state.setFilterSheetOpen);return <PageContainer><PageHeader eyebrow="MAKE A LITTLE DISCOVERY" title="Find your next thing." description="Big nights, small gatherings, and everything in between."/><SearchBox onSearch={update}/><div className="browse-layout">{panel&&<FilterPanel filters={filters} onChange={update} onClear={clear}/>}<div className="browse-results"><div className="browse-toolbar"><span><strong>{items.length}</strong> events to explore</span><div>{!panel&&<Button variant="secondary" onClick={()=>setOpen(true)}><SlidersHorizontal size={16}/>Filters</Button>}<select aria-label="Sort events" value={filters.sort} onChange={(event)=>update({sort:event.target.value as EventFilters['sort']})}><option value="soonest">Soonest first</option><option value="best-match">Best match</option><option value="popular">Most popular</option></select></div></div><ActiveFilterChips filters={filters} onChange={update}/>{query.isError?<ErrorState retry={()=>void query.refetch()}/>:query.isPending?<EventGrid items={[]} loading reduceColumns/>:items.length?<EventGrid items={items} reduceColumns/>:<EmptyState title="Nothing here just yet" description="Try a broader search. A new experience could be one filter away." action={<Button onClick={clear}>Clear all filters</Button>}/>}</div></div>{!panel&&<FilterSheet open={open} onClose={()=>setOpen(false)} filters={filters} onChange={update} onClear={clear}/>}</PageContainer>;}