import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/utils/tailwind/cn';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md text-sm font-medium ring-offset-white transition-colors',
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-neutral-950',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
  ),
  {
    variants: {
      variant: {
        default: cn('bg-neutral-50 text-neutral-900 hover:bg-neutral-50/90'),
        destructive: cn('bg-red-900 text-neutral-50 hover:bg-red-900/90'),
        outline: cn(
          'border border-neutral-800 bg-neutral-950 hover:bg-neutral-800',
          'hover:text-neutral-50'
        ),
        secondary: cn('bg-neutral-800 text-neutral-50 hover:bg-neutral-800/80'),
        ghost: cn('hover:bg-neutral-800 hover:text-neutral-50'),
        link: cn('text-neutral-50 underline-offset-4 hover:underline'),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
