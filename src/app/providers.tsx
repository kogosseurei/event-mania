'use client';
import { useState, type ReactNode, type ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export interface ProvidersProps {
  children: ReactNode;
}
export function Providers({ children }: ProvidersProps): ReactElement {
  const [client] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } }),
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
