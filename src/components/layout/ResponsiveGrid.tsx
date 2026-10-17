import type { ReactElement, ReactNode } from 'react';
import { cn } from '@/lib';
export interface ResponsiveGridProps {children:ReactNode;reduceColumns?:boolean;className?:string}
export function ResponsiveGrid({children,reduceColumns=false,className}:ResponsiveGridProps):ReactElement {return <div className={cn('responsive-grid',reduceColumns&&'reduced-grid',className)}>{children}</div>;}