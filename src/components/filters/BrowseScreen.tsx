'use client';
import type { ReactElement } from 'react';
import { PageContainer, PageHeader } from '@/components/layout';
import { useBrowse } from '@/hooks';
import { FilterPanel } from './FilterPanel';
import { FilterSheet } from './FilterSheet';
import { ActiveFilterChips } from './ActiveFilterChips';
import { SearchBox } from './SearchBox';
import { BrowseToolbar } from './BrowseToolbar';
import { BrowseResults } from './BrowseResults';
export function BrowseScreen(): ReactElement {
  const behavior = useBrowse();
  const { filters, update, clear, panel, items } = behavior;
  const form = { filters, onChange: update, onClear: clear };
  const toolbar = (
    <BrowseToolbar
      count={items.length}
      panel={panel}
      sort={filters.sort}
      onSort={(sort) => update({ sort })}
      onOpen={() => behavior.setOpen(true)}
    />
  );
  return (
    <PageContainer>
      <PageHeader
        eyebrow="MAKE A LITTLE DISCOVERY"
        title="Find your next thing."
        description="Big nights, small gatherings, and everything in between."
      />
      <SearchBox onSearch={update} />
      <div className="browse-layout">
        {panel && <FilterPanel {...form} />}
        <div className="browse-results">
          {toolbar}
          <ActiveFilterChips filters={filters} onChange={update} />
          <BrowseResults {...behavior} />
        </div>
      </div>
      {!panel && (
        <FilterSheet open={behavior.open} onClose={() => behavior.setOpen(false)} {...form} />
      )}
    </PageContainer>
  );
}
