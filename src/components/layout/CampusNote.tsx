import Link from 'next/link';
import type { ReactElement } from 'react';
import { ArrowUpRight, Sparkles, CircleHelp } from 'lucide-react';
export function CampusNote(): ReactElement {
  return (
    <div className="sidebar-bottom">
      <div className="campus-note">
        <Sparkles size={22} />
        <h3>More than a timetable.</h3>
        <p>Find your people. Try something new. Make it your campus.</p>
        <Link href="/browse">
          Explore what’s on
          <ArrowUpRight size={15} />
        </Link>
      </div>
      <Link className="support-link" href="/mcp">
        <CircleHelp size={18} />
        Connect your AI assistant
      </Link>
      <div className="sidebar-footer">
        <span className="status-dot" />
        Made for campus life
      </div>
    </div>
  );
}
