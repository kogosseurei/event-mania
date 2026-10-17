'use client';
import type { ReactElement } from 'react';
import { useToastStore } from '@/stores';
import { Toast } from './Toast';
export function Toaster(): ReactElement {
  const queue = useToastStore((state) => state.queue);
  return (
    <div className="toaster" aria-live="polite" aria-relevant="additions">
      {queue.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
