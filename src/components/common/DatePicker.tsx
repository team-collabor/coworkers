'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/common/Button/ShadcnButton';
import { Calendar } from '@/components/common/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/Popover';
import { cn } from '@/utils/tailwind/cn';

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start rounded-xl py-[1.5rem] font-pretendard',
            'text-left text-lg-regular text-primary',
            'bg-secondary hover:bg-tertiary active:bg-tertiary',
            'border-primary hover:border-interaction-hover',
            !date && 'text-default'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>날짜를 선택해주세요</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-xl p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
