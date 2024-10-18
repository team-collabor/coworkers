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
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: cn(
          'text-neutral-400 rounded-md w-9 font-normal text-[0.8rem]'
        ),
        row: cn('flex w-full mt-2'),
        cell: cn(
          'h-9 w-9 text-center text-sm p-0 relative',
          '[&:has([aria-selected].day-range-end)]:rounded-r-md',
          '[&:has([aria-selected].day-outside)]:bg-neutral-800/50',
          '[&:has([aria-selected])]:bg-neutral-800',
          'first:[&:has([aria-selected])]:rounded-l-md',
          'last:[&:has([aria-selected])]:rounded-r-md',
          'focus-within:relative focus-within:z-20'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: cn('day-range-end'),
        day_selected: cn(
          'bg-neutral-50 text-neutral-900 hover:bg-neutral-50',
          'hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900'
        ),
        day_today: cn('bg-neutral-800 text-neutral-50'),
        day_outside: cn(
          'day-outside text-neutral-400 opacity-50',
          'aria-selected:bg-neutral-800/50 aria-selected:text-neutral-400',
          'aria-selected:opacity-30'
        ),
        day_disabled: cn('text-neutral-400 opacity-50'),
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