'use client';
import type { ReactElement } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { ToastMessage } from '@/stores';
import { useToast } from '@/hooks';
import { IconButton } from './IconButton';
import { Button } from './Button';
export interface ToastProps {
  toast: ToastMessage;
}
export function Toast({ toast }: ToastProps): ReactElement {
  const behavior = useToast(toast);
  return (
    <div
      className="toast"
      onMouseEnter={behavior.pause}
      onMouseLeave={behavior.resume}
      onFocus={behavior.pause}
      onBlur={behavior.resume}
    >
      <CheckCircle2 size={20} />
      <span>{toast.message}</span>
      {toast.onAction && (
        <Button variant="ghost" onClick={behavior.act}>
          {toast.actionLabel ?? 'Undo'}
        </Button>
      )}
      <IconButton aria-label="Dismiss notification" onClick={behavior.dismiss}>
        <X size={16} />
      </IconButton>
    </div>
  );
}
