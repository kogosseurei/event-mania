import Link from 'next/link';
import type { ReactElement } from 'react';
import { GraduationCap, CalendarDays } from 'lucide-react';
import { university } from '@/config';
export function Topbar(): ReactElement {
  return (
    <header className="topbar">
      <Link href="/" className="mobile-brand">
        <GraduationCap size={22} />
        <strong>
          campus<span className="brand-dot">.</span>
        </strong>
      </Link>
      <span className="topbar-university">
        {university.name}
        <span className="topbar-separator">/</span>
        <span>Campus life</span>
      </span>
      <div className="topbar-right">
        <span className="term-label">
          <span className="status-dot" />A little more connected
        </span>
        <Link href="/my-events" className="icon-button" aria-label="My events calendar">
          <CalendarDays size={20} />
        </Link>
        <Link
          href="/profile/interests"
          className="student-avatar"
          aria-label="You: edit your interests"
        >
          You
        </Link>
      </div>
    </header>
  );
}
