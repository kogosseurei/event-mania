import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import { GraduationCap, CalendarDays } from 'lucide-react';
import { university } from '@/config';
import { Toaster } from '@/components/ui';
import { BottomTabBar } from './BottomTabBar';
import { NavRail } from './NavRail';
import { Sidebar } from './Sidebar';
export interface AppShellProps {children:ReactNode;hideBottomTabBar?:boolean}
export function AppShell({children,hideBottomTabBar=false}:AppShellProps):ReactElement {return <div className={`app-shell ${hideBottomTabBar?'detail-shell':''}`}><Sidebar/><NavRail/><div className="shell-content"><header className="topbar"><Link href="/" className="mobile-brand"><GraduationCap size={22}/><strong>campus<span className="brand-dot">.</span></strong></Link><span className="topbar-university">{university.name}<span className="topbar-separator">/</span><span>Campus life</span></span><div className="topbar-right"><span className="term-label"><span className="status-dot"/> A little more connected</span><Link href="/my-events" className="icon-button" aria-label="My events calendar"><CalendarDays size={20}/></Link><Link href="/profile/interests" className="student-avatar" aria-label="Edit your interests">You</Link></div></header>{children}</div>{!hideBottomTabBar&&<BottomTabBar/>}<Toaster/></div>;}