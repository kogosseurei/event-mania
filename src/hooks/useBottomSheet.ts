'use client';
import { useEffect, useRef, type RefObject } from 'react';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useEscapeKey } from './useEscapeKey';
import { useFocusTrap } from './useFocusTrap';
import { useSwipeToClose, type SwipeBehavior } from './useSwipeToClose';
export interface BottomSheetBehavior extends SwipeBehavior {
  dialogRef: RefObject<HTMLDialogElement | null>;
}
export function useBottomSheet(open: boolean, onClose: () => void): BottomSheetBehavior {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipe = useSwipeToClose(onClose);
  useBodyScrollLock(open);
  useEscapeKey(onClose, open);
  useFocusTrap(dialogRef, open);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const focused = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (focused instanceof HTMLElement) focused.focus();
    };
  }, [open]);
  return { dialogRef, ...swipe };
}
