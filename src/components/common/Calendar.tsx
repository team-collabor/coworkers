import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/common/Button/ShadcnButton';
import { cn } from '@/utils/tailwind/cn';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col mob:flex-row space-y-4 mob:space-x-4 mob:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-md-regular text-inverse',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-9 bg-transparent p-0 opacity-90 hover:bg-interaction-hover'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: cn('text-inverse rounded-md w-[2.714rem] text-lg-semibold'),
        row: cn('flex w-full mt-2'),
        cell: cn(
          'h-8 w-[2.714rem] text-center text-sm p-0 relative',
          '[&:has([aria-selected].day-range-end)]:rounded-r-md',
          '[&:has([aria-selected].day-outside)]:bg-neutral-800/50',
          '[&:has([aria-selected])]:bg-neutral-800',
          'first:[&:has([aria-selected])]:rounded-l-md',
          'last:[&:has([aria-selected])]:rounded-r-md',
          'focus-within:relative focus-within:z-20'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-10 p-0 text-md-medium text-inverse',
          'hover:bg-interaction-hover',
          'aria-selected:bg-brand-primary aria-selected:text-inverse'
        ),
        day_range_end: cn('day-range-end'),
        day_selected: cn(
          'bg-brand-primary text-inverse hover:bg-brand-primary',
          'hover:text-inverse focus:bg-brand-primary focus:text-inverse'
        ),
        day_today: cn('bg-tertiary text-inverse'),
        day_outside: cn(
          'day-outside text-inverse opacity-60',
          'aria-selected:bg-brand-primary aria-selected:text-inverse',
          'aria-selected:opacity-60'
        ),
        day_disabled: cn('text-default opacity-50'),
        day_range_middle: cn(
          'aria-selected:bg-neutral-800 aria-selected:text-neutral-50'
        ),
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line max-len
        // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        // eslint-disable-next-line max-len
        // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
