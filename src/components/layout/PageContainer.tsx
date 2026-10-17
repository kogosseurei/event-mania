import type { ReactElement, ReactNode } from 'react';
import { cn } from '@/lib';
export interface PageContainerProps {children:ReactNode;className?:string}
export function PageContainer({children,className}:PageContainerProps):ReactElement {return <main id="main" className={cn('page-container',className)}>{children}</main>;}