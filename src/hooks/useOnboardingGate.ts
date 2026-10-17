'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/stores';
import { useProfileHydrated } from './useHasHydrated';
export function useOnboardingGate(): { ready: boolean } {
  const hydrated = useProfileHydrated();
  const onboarded = useProfileStore((state) => state.onboarded);
  const router = useRouter();
  useEffect(() => {
    if (hydrated && !onboarded) router.replace('/onboarding');
  }, [hydrated, onboarded, router]);
  return { ready: hydrated && onboarded };
}
