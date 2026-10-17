'use client';
import { useEffect, useState } from 'react';
import { useToastStore, type ToastMessage } from '@/stores';
import { TOAST_DURATION_MS } from '@/config';
export interface ToastBehavior {pause():void;resume():void;dismiss():void;act():void}
export function useToast(toast:ToastMessage):ToastBehavior {const [paused,setPaused]=useState(false);const dismiss=useToastStore((state)=>state.dismiss);useEffect(()=>{if(paused)return;const timer=setTimeout(()=>dismiss(toast.id),toast.duration??TOAST_DURATION_MS);return ()=>clearTimeout(timer);},[paused,dismiss,toast.id,toast.duration]);return {pause:()=>setPaused(true),resume:()=>setPaused(false),dismiss:()=>dismiss(toast.id),act:()=>{toast.onAction?.();dismiss(toast.id);}};}