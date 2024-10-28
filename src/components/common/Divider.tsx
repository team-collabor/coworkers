import { cn } from '@/utils/tailwind/cn';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

type DividerProps = ComponentPropsWithoutRef<'hr'> & {
  orientation?: 'horizontal' | 'vertical';
};

export const Divider = forwardRef<ElementRef<'hr'>, DividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <hr
      ref={ref}
      className={cn('h-px w-full bg-icon-primary', className)}
      aria-orientation={orientation}
      {...props}
    />
  )
);

Divider.displayName = 'Divider';
