import Link from 'next/link';
import type { ReactElement } from 'react';
import { GraduationCap } from 'lucide-react';
import { university } from '@/config';
import { NavigationLinks } from './NavigationLinks';
import { CampusNote } from './CampusNote';
export function Sidebar(): ReactElement {
  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <span className="brand-mark">
          <GraduationCap size={25} />
        </span>
        <span>
          campus<span className="brand-dot">.</span>
          <small>EVENTS & EXPERIENCES</small>
        </span>
      </Link>
      <div className="university-label">
        <span className="university-avatar">{university.shortName}</span>
        <div>
          {university.name}
          <small>Your campus, connected</small>
        </div>
      </div>
      <span className="nav-caption">DISCOVER</span>
      <nav aria-label="Desktop navigation">
        <NavigationLinks />
      </nav>
      <CampusNote />
    </aside>
  );
}
