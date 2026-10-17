import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { studentProfileSchema } from '@/schemas';
import type { Interest, StudentProfile } from '@/types';
interface ProfileState extends StudentProfile {
  setInterests(value: Interest[]): void;
  toggleInterest(value: Interest): void;
  setFaculty(value: string | null): void;
  completeOnboarding(): void;
  reset(): void;
}
const initial: StudentProfile = { interests: [], faculty: null, onboarded: false };
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      ...initial,
      setInterests: (interests) => set({ interests }),
      toggleInterest: (interest) =>
        set((state) => ({
          interests: state.interests.includes(interest)
            ? state.interests.filter((value) => value !== interest)
            : [...state.interests, interest],
        })),
      setFaculty: (faculty) => set({ faculty }),
      completeOnboarding: () => set((state) => ({ onboarded: state.interests.length >= 3 })),
      reset: () => set(initial),
    }),
    {
      name: 'campus-events:profile:v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: ({ interests, faculty, onboarded }) => ({ interests, faculty, onboarded }),
      migrate: (value) =>
        studentProfileSchema.safeParse(value).success ? studentProfileSchema.parse(value) : initial,
      merge: (persisted, current) => ({
        ...current,
        ...(studentProfileSchema.safeParse(persisted).success
          ? studentProfileSchema.parse(persisted)
          : initial),
      }),
    },
  ),
);
export function useInterests(): Interest[] {
  return useProfileStore((state) => state.interests);
}
