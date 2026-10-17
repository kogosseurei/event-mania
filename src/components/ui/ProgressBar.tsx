import type { ReactElement } from 'react';
import { cn } from '@/lib';
export interface ProgressBarProps {value:number;label:string;tone?:'primary'|'warning'}
export function ProgressBar({value,label,tone='primary'}:ProgressBarProps):ReactElement {const percentage=Math.min(100,Math.max(0,value));return <div className={cn('progress',`progress-${tone}`)} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percentage)}><span style={{width:`${percentage}%`}}/></div>;}