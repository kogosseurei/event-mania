'use client';
import { useEffect, useRef, type RefObject, type PointerEventHandler } from 'react';
export interface BottomSheetBehavior {dialogRef:RefObject<HTMLDialogElement|null>;onPointerDown:PointerEventHandler;onPointerUp:PointerEventHandler}
export function useBottomSheet(open:boolean,onClose:()=>void):BottomSheetBehavior {
 const dialogRef=useRef<HTMLDialogElement>(null);const start=useRef({y:0,time:0});
 useEffect(()=>{const dialog=dialogRef.current;if(!dialog)return;if(open){const focused=document.activeElement;dialog.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return ()=>{dialog.close();document.body.style.overflow=overflow;if(focused instanceof HTMLElement)focused.focus();};}},[open]);
 return {dialogRef,onPointerDown:(event)=>{start.current={y:event.clientY,time:Date.now()};},onPointerUp:(event)=>{const distance=event.clientY-start.current.y;const elapsed=Math.max(1,Date.now()-start.current.time);if(distance>100||(distance>30&&distance/elapsed>0.6))onClose();}};
}