import type { ReactElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';
const variants = cva('skeleton', {
  variants: {
    shape: { text: 'skeleton-text', block: 'skeleton-block', circle: 'skeleton-circle' },
  },
  defaultVariants: { shape: 'text' },
});
export interface SkeletonProps extends VariantProps<typeof variants> {
  className?: string;
}
export function Skeleton({ shape, className }: SkeletonProps): ReactElement {
  return <div aria-hidden="true" className={cn(variants({ shape }), className)} />;
}
