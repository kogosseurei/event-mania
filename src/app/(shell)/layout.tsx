import type { ReactElement, ReactNode } from 'react';
import { AppShell } from '@/components/layout';
export default function ShellLayout({ children }: { children: ReactNode }): ReactElement {
  return <AppShell>{children}</AppShell>;
}
