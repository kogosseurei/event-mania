'use client';
import type { ReactElement, ReactNode } from 'react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
export interface PullToRefreshProps {children:ReactNode}
export function PullToRefresh({children}:PullToRefreshProps):ReactElement {const gestures=usePullToRefresh();return <div {...gestures}>{children}</div>;}