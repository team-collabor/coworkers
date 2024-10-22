import {
  Calendar as CalendarIcon,
  CalendarSearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/common/Button/ShadcnButton';
import { Calendar } from '@/components/common/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/Popover';
import { useTaskStore } from '@/store/useTaskStore';
import { formatKoreanDate } from '@/utils/dateTimeUtils/FormatData';
import { cn } from '@/utils/tailwind/cn';

type DatePickerProps = {
  mode: 'selector' | 'input';
  initialDate?: Date;
  className?: string;
  inputButtonClassName?: string;
  popoverContentClassName?: string;
};

export function DatePicker({
  mode,
  initialDate,
  className,
  inputButtonClassName,
  popoverContentClassName,
}: DatePickerProps) {
  // selector 모드에서는 selectedDate를 사용하고, input 모드에서는 date를 사용
  const { selectedDate, setSelectedDate } = useTaskStore();
  const [date, setDate] = useState<Date>(initialDate || new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSelectDate = (value: Date) => {
    if (!value || !(value instanceof Date)) return;
    if (mode === 'selector') {
      setSelectedDate(value);
    } else {
      setDate(value);
    }
    setIsPopoverOpen(false);
  };
  const handlePrevDate = () => {
    const yesterday = new Date(selectedDate);
    yesterday.setDate(yesterday.getDate() - 1);
    handleSelectDate(yesterday);
  };
  const handleNextDate = () => {
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    handleSelectDate(tomorrow);
  };

  useEffect(() => {
    if (mode === 'input') {
      setDate(initialDate || new Date());
    }
  }, [initialDate, mode]);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {mode === 'selector' && (
        <>
          <p className="text-xl-medium text-primary" suppressHydrationWarning>
            {selectedDate
              ? formatKoreanDate(selectedDate)
              : '날짜를 선택해주세요'}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className={cn(
                'h-6 w-6 text-lg-medium text-primary',
                'bg-secondary hover:bg-interaction-hover',
                'active:bg-interaction-pressed',
                'rounded-full'
              )}
              onClick={handlePrevDate}
            >
              <ChevronLeftIcon className="h-3 w-3 text-icon-primary" />
            </Button>
            <Button
              variant="secondary"
              className={cn(
                'h-6 w-6 text-lg-medium text-primary',
                'bg-secondary hover:bg-interaction-hover',
                'active:bg-interaction-pressed',
                'rounded-full'
              )}
              onClick={handleNextDate}
            >
              <ChevronRightIcon className="h-1 w-1 text-icon-primary" />
            </Button>
          </div>
        </>
      )}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          {mode === 'input' ? (
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start rounded-xl py-[1.5rem] font-pretendard',
                'text-left text-lg-regular text-primary',
                'bg-secondary hover:bg-tertiary active:bg-tertiary',
                'border-primary hover:border-interaction-hover',
                'active:bg-interaction-pressed',
                !date && 'text-default',
                inputButtonClassName
              )}
              suppressHydrationWarning
            >
              <CalendarIcon className="mb-1 mr-2 h-4 w-4 text-icon-primary" />
              {date ? formatKoreanDate(date) : <span>날짜를 선택해주세요</span>}
            </Button>
          ) : (
            <Button
              variant="default"
              className={cn(
                'h-8 w-8 rounded-full bg-secondary',
                'hover:bg-interaction-focus active:bg-interaction-pressed'
              )}
            >
              <CalendarSearchIcon className={cn('h-4 w-4 text-icon-primary')} />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-auto rounded-xl p-0', popoverContentClassName)}
        >
          <Calendar
            id="date-picker"
            mode="single"
            selected={mode === 'input' ? date : new Date(selectedDate)}
            onSelect={(value) => handleSelectDate(value as Date)}
            defaultMonth={mode === 'input' ? date : new Date(selectedDate)}
          />
        </PopoverContent>
      </Popover>
      {mode === 'input' && (
        <input
          type="text"
          value={date?.toISOString()}
          className="hidden"
          disabled
          suppressHydrationWarning
        />
      )}
    </div>
  );
}
