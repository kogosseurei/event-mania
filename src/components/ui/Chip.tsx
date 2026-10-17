import type { ReactElement, ButtonHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib';
const variants=cva('chip',{variants:{selected:{true:'chip-selected',false:''}}});
export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {selected?:boolean}
export function Chip({selected=false,className,...props}:ChipProps):ReactElement {return <button type="button" aria-pressed={selected} {...props} className={cn(variants({selected}),className)}/>;}