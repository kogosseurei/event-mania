'use client';
import { useId, type ReactElement, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useBottomSheet } from '@/hooks';
import { IconButton } from './IconButton';
export interface BottomSheetProps {
  open: boolean;
  onClose(): void;
  title: string;
  children: ReactNode;
}
export function BottomSheet({ open, onClose, title, children }: BottomSheetProps): ReactElement {
  const id = useId();
  const { dialogRef, onPointerDown, onPointerUp } = useBottomSheet(open, onClose);
  return (
    <dialog
      ref={dialogRef}
      className="bottom-sheet"
      aria-modal="true"
      aria-labelledby={id}
      onCancel={onClose}
    >
      <div className="sheet-handle" onPointerDown={onPointerDown} onPointerUp={onPointerUp} />
      <div className="sheet-title">
        <h2 id={id}>{title}</h2>
        <IconButton aria-label="Close filters" onClick={onClose}>
          <X size={20} />
        </IconButton>
      </div>
      {children}
    </dialog>
  );
}
