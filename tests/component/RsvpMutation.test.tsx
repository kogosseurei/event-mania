// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { createElement, type ReactElement, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
vi.mock('@/api/rsvpApi', () => ({ simulateRsvp: vi.fn() }));
import { simulateRsvp } from '@/api';
import { useRsvp } from '@/hooks';
import { useRsvpStore, useToastStore } from '@/stores';
import { MockEventRepository } from '@/server/events';
afterEach(() => {
  cleanup();
  useRsvpStore.setState({ records: {} });
  useToastStore.setState({ queue: [] });
  localStorage.clear();
});
it('rolls back an optimistic RSVP when its transport fails', async () => {
  const event = (await new MockEventRepository(0).listEvents())[0];
  if (!event) throw new Error('Missing fixture');
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  client.setQueryData(['events', event.id], event);
  let rejectPending: ((reason: Error) => void) | undefined;
  vi.mocked(simulateRsvp).mockImplementation(
    () =>
      new Promise((_resolve, reject) => {
        rejectPending = reject;
      }),
  );
  function Wrapper({ children }: { children: ReactNode }): ReactElement {
    return createElement(QueryClientProvider, { client }, children);
  }
  const { result } = renderHook(() => useRsvp(event.id), { wrapper: Wrapper });
  await waitFor(() => expect(result.current.state).toBe('idle'));
  act(() => {
    void result.current.onPress();
  });
  expect(useRsvpStore.getState().records[event.id]).toBeTruthy();
  expect(result.current.state).toBe('pending');
  await act(async () => {
    rejectPending?.(new Error('Transport unavailable'));
  });
  await waitFor(() => expect(result.current.state).toBe('idle'));
  expect(useRsvpStore.getState().records[event.id]).toBeUndefined();
  expect(useToastStore.getState().queue.at(-1)?.tone).toBe('error');
});
