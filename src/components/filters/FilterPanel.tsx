import type { ReactElement } from 'react';
import { FilterForm, type FilterFormProps } from './FilterForm';
export function FilterPanel(props: FilterFormProps): ReactElement {
  return (
    <aside className="filter-panel">
      <FilterForm {...props} />
    </aside>
  );
}
