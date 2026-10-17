'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { navigationItems } from './navigation';
export function NavigationLinks():ReactElement {const path=usePathname();return <>{navigationItems.map(({href,label,icon:Icon})=><Link key={href} href={href} className={`nav-link ${path===href?'active':''}`} aria-current={path===href?'page':undefined}><Icon size={21} strokeWidth={path===href?2.5:1.7}/><span>{label}</span></Link>)}</>;}