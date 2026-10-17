import type { ReactElement, ReactNode } from 'react';
import { CalendarSearch } from 'lucide-react';
export interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}
export function EmptyState({ title, description, action }: EmptyStateProps): ReactElement {
  return (
    <div className="empty-state">
      <CalendarSearch size={40} />
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}
