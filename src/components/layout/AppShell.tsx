import type { ReactElement, ReactNode } from 'react';
import { Toaster } from '@/components/ui';
import { BottomTabBar } from './BottomTabBar';
import { NavRail } from './NavRail';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
export interface AppShellProps {
  children: ReactNode;
  hideBottomTabBar?: boolean;
}
export function AppShell({ children, hideBottomTabBar = false }: AppShellProps): ReactElement {
  return (
    <div className={`app-shell ${hideBottomTabBar ? 'detail-shell' : ''}`}>
      <Sidebar />
      <NavRail />
      <div className="shell-content">
        <Topbar />
        {children}
      </div>
      {!hideBottomTabBar && <BottomTabBar />}
      <Toaster />
    </div>
  );
}
