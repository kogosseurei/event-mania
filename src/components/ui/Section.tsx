import type { ReactElement, ReactNode } from 'react';
export interface SectionProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}
export function Section({ title, children, action }: SectionProps): ReactElement {
  return (
    <section className="section">
      <div className="section-heading">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
