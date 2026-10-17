'use client';
import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/stores';
import { MINIMUM_INTERESTS } from '@/config';
import type { Interest } from '@/types';
import { useProfileHydrated } from './useHasHydrated';
export interface OnboardingBehavior {
  interests: Interest[];
  faculty: string | null;
  hydrated: boolean;
  canContinue: boolean;
  toggle(interest: Interest): void;
  setFaculty(value: string | null): void;
  complete(): void;
}
export function useOnboarding(): OnboardingBehavior {
  const router = useRouter();
  const hydrated = useProfileHydrated();
  const interests = useProfileStore((state) => state.interests);
  const faculty = useProfileStore((state) => state.faculty);
  const toggle = useProfileStore((state) => state.toggleInterest);
  const setFaculty = useProfileStore((state) => state.setFaculty);
  const completeOnboarding = useProfileStore((state) => state.completeOnboarding);
  return {
    interests,
    faculty,
    hydrated,
    canContinue: hydrated && interests.length >= MINIMUM_INTERESTS,
    toggle,
    setFaculty,
    complete: () => {
      if (interests.length < MINIMUM_INTERESTS) return;
      completeOnboarding();
      router.push('/');
    },
  };
}
