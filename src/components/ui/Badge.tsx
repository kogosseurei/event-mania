import type { ReactElement, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib';
const variants = cva('badge', {
  variants: {
    tone: {
      primary: 'badge-primary',
      success: 'badge-success',
      warning: 'badge-warning',
      muted: 'badge-muted',
    },
  },
  defaultVariants: { tone: 'muted' },
});
export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof variants> {}
export function Badge({ tone, className, ...props }: BadgeProps): ReactElement {
  return <span {...props} className={cn(variants({ tone }), className)} />;
}
