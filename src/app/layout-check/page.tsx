import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { LayoutReview } from '@/components/layout/LayoutReview';
export default function LayoutCheck():ReactElement {if(process.env.NODE_ENV==='production')notFound();return <LayoutReview/>;}