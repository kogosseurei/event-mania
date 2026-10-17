import type { ReactElement } from 'react';
import { BottomSheet, Button } from '@/components/ui';
import { FilterForm, type FilterFormProps } from './FilterForm';
export interface FilterSheetProps extends FilterFormProps {
  open: boolean;
  onClose(): void;
}
export function FilterSheet({ open, onClose, ...props }: FilterSheetProps): ReactElement {
  return (
    <BottomSheet open={open} onClose={onClose} title="Find your next thing">
      <FilterForm {...props} />
      <Button className="filter-done" onClick={onClose}>
        Show events
      </Button>
    </BottomSheet>
  );
}
