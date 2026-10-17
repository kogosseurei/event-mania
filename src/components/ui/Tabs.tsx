'use client';
import type { ReactElement } from 'react';
import { useTabs } from '@/hooks/useTabs';
export interface TabsProps {tabs:{value:string;label:string}[];value:string;onChange(value:string):void;label:string}
export function Tabs({tabs,value,onChange,label}:TabsProps):ReactElement {const behavior=useTabs(tabs.map((tab)=>tab.value),value,onChange);return <div className="tabs" role="tablist" aria-label={label} {...behavior}>{tabs.map((tab)=><button key={tab.value} type="button" role="tab" aria-selected={value===tab.value} tabIndex={value===tab.value?0:-1} onClick={()=>onChange(tab.value)}>{tab.label}</button>)}</div>;}