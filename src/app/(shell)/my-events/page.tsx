import { Suspense, type ReactElement } from 'react';
import { MyEventsScreen } from '@/components/events';
import { Skeleton } from '@/components/ui';
export default function MyEvents():ReactElement {return <Suspense fallback={<main id="main" className="page-container"><h1>My events</h1><Skeleton shape="block"/></main>}><MyEventsScreen/></Suspense>;}