import type { ReactElement, ReactNode } from 'react';
export interface EventDetailLayoutProps {
  hero: ReactNode;
  main: ReactNode;
  aside: ReactNode;
  bar: ReactNode;
}
export function EventDetailLayout({
  hero,
  main,
  aside,
  bar,
}: EventDetailLayoutProps): ReactElement {
  return (
    <>
      <div className="detail-layout">
        <div className="detail-hero">{hero}</div>
        <div className="detail-main">{main}</div>
        <aside className="detail-aside">{aside}</aside>
      </div>
      {bar}
    </>
  );
}
