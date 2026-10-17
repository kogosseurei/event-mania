import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import { SlidersHorizontal } from 'lucide-react';
export interface PageHeaderProps {title:string;description?:string;eyebrow?:string;actions?:ReactNode}
export function PageHeader({title,description,eyebrow,actions}:PageHeaderProps):ReactElement {return <div className="page-header"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description&&<p>{description}</p>}</div><div className="header-actions">{actions}<Link href="/profile/interests" className="button button-secondary"><SlidersHorizontal size={16}/><span>Edit interests</span></Link></div></div>;}