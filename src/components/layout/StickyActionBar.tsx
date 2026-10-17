import type { ReactElement, ReactNode } from 'react';
export interface StickyActionBarProps {children:ReactNode}
export function StickyActionBar({children}:StickyActionBarProps):ReactElement {return <div className="sticky-action-bar">{children}</div>;}