// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { Toaster } from '@/components/ui';
import { useToastStore } from '@/stores';
afterEach(() => {
  cleanup();
  useToastStore.setState({ queue: [] });
});
it('exposes a reachable Undo action and restores the previous state', () => {
  const undo = vi.fn();
  useToastStore
    .getState()
    .push({ message: 'Event saved', tone: 'success', actionLabel: 'Undo', onAction: undo });
  render(<Toaster />);
  fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
  expect(undo).toHaveBeenCalledOnce();
  expect(screen.queryByText('Event saved')).toBeNull();
});
