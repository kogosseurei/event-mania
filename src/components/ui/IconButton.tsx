import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib';
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
}
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, ...props },
  ref,
) {
  return <button {...props} ref={ref} className={cn('icon-button', className)} />;
});
