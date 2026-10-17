import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { z } from 'zod';
const savedSchema = z.object({ savedIds: z.array(z.string()) });
interface SavedState {
  savedIds: string[];
  save(id: string): void;
  unsave(id: string): void;
  toggle(id: string): void;
}
export const useSavedStore = create<SavedState>()(
  persist(
    (set) => ({
      savedIds: [],
      save: (id) => set((state) => ({ savedIds: [...new Set([...state.savedIds, id])] })),
      unsave: (id) =>
        set((state) => ({ savedIds: state.savedIds.filter((value) => value !== id) })),
      toggle: (id) =>
        set((state) => ({
          savedIds: state.savedIds.includes(id)
            ? state.savedIds.filter((value) => value !== id)
            : [...state.savedIds, id],
        })),
    }),
    {
      name: 'campus-events:saved:v1',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: ({ savedIds }) => ({ savedIds }),
      migrate: (value) => savedSchema.safeParse(value).data ?? { savedIds: [] },
      merge: (persisted, current) => ({
        ...current,
        ...(savedSchema.safeParse(persisted).data ?? { savedIds: [] }),
      }),
    },
  ),
);
export function useSavedIds(): string[] {
  return useSavedStore((state) => state.savedIds);
}
export function useIsSaved(id: string): boolean {
  return useSavedStore((state) => state.savedIds.includes(id));
}
