'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { useOnboarding } from '@/hooks';
import { Button } from '@/components/ui';
import { InterestPicker } from './InterestPicker';
import { FacultySelect } from './FacultySelect';
export interface InterestsScreenProps {
  editing?: boolean;
}
export function InterestsScreen({ editing = false }: InterestsScreenProps): ReactElement {
  const behavior = useOnboarding();
  return (
    <main id="main" className="onboarding-page">
      <div className="onboarding-card">
        <Link href="/browse" className="onboarding-brand">
          <GraduationCap size={28} />
          campus<span>.</span>
        </Link>
        <div className="onboarding-sparkle">
          <Sparkles size={25} />
        </div>
        <p className="eyebrow">{editing ? 'MAKE IT YOURS' : 'WELCOME TO CAMPUS LIFE'}</p>
        <h1>{editing ? 'A little more you.' : 'What are you into?'}</h1>
        <p className="onboarding-description">
          Pick at least three interests. We’ll find the events, experiences, and people that feel
          like you.
        </p>
        <InterestPicker selected={behavior.interests} onToggle={behavior.toggle} />
        <FacultySelect value={behavior.faculty} onChange={behavior.setFaculty} />
        <div className="onboarding-actions">
          <Button size="lg" disabled={!behavior.canContinue} onClick={behavior.complete}>
            {editing ? 'Save my interests' : 'Find my events'}
            <ArrowRight size={18} />
          </Button>
        </div>
        <p className="onboarding-footnote">
          Your interests, your feed. Change them whenever you like.
        </p>
      </div>
    </main>
  );
}
