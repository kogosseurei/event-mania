import Link from 'next/link';
import type { ReactElement } from 'react';
import { GraduationCap } from 'lucide-react';
import { NavigationLinks } from './NavigationLinks';
export function NavRail():ReactElement {return <nav className="nav-rail" aria-label="Tablet navigation"><Link href="/" className="rail-brand" aria-label="Campus Events home"><GraduationCap size={26}/></Link><NavigationLinks/></nav>;}