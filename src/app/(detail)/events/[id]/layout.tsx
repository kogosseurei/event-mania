import type { ReactElement, ReactNode } from 'react';
import { AppShell } from '@/components/layout';
export default function DetailLayout({ children }: { children: ReactNode }): ReactElement {
  return <AppShell hideBottomTabBar>{children}</AppShell>;
}
