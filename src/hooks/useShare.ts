'use client';
import { useToastStore } from '@/stores';
import { eventPath } from '@/lib';
export function useShare(id: string, title: string): { share(): Promise<void> } {
  return {
    share: async () => {
      const url = new URL(eventPath(id), window.location.origin).href;
      try {
        if (navigator.share) {
          await navigator.share({ title, url });
          return;
        }
        await navigator.clipboard.writeText(url);
        useToastStore.getState().push({ message: 'Link copied', tone: 'success' });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        useToastStore
          .getState()
          .push({ message: 'Could not share this event. Try copying the address.', tone: 'error' });
      }
    },
  };
}
