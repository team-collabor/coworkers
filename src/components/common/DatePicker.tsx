import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import * as React from 'react';

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
};

export function DatePicker({ mode }: DatePickerProps) {
  // selector 모드에서는 selectedDate를 사용하고, input 모드에서는 date를 사용
  const { selectedDate, setSelectedDate } = useTaskStore();
  const [date, setDate] = React.useState<Date>();

  const handlePrevDate = () => {
    const yesterday = new Date(selectedDate);
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday);
  };

  const handleNextDate = () => {
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
  };

  React.useEffect(() => {
    if (!selectedDate) {
      // selector 선택된 날짜가 없을 때
      setSelectedDate(new Date());
    }
    if (!date) {
      // input 선택된 날짜가 없을 때
      // 없다면 오늘 날짜를 선택, 있다면 selector 선택된 날짜를 선택
      setDate(selectedDate);
    }
  }, [selectedDate, date, setSelectedDate, setDate]);

  return (
    <div className="flex items-center gap-3">
      {mode === 'selector' && (
        <>
          <p className="text-xl-medium text-primary">
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
              <ChevronLeftIcon className="h-3 w-3" />
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
              <ChevronRightIcon className="h-1 w-1" />
            </Button>
          </div>
        </>
      )}
      <Popover>
        <PopoverTrigger asChild>
          {mode === 'input' ? (
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
          ) : (
            <Button
              variant="default"
              className={cn(
                'h-8 w-8 rounded-full bg-secondary',
                'hover:bg-interaction-focus active:bg-interaction-pressed'
              )}
            >
              <CalendarIcon className={cn('h-4 w-4 text-icon-primary')} />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto rounded-xl p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={
              mode === 'selector'
                ? (value) => setSelectedDate(value as Date)
                : (value) => setDate(value as Date)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {mode === 'input' && (
        <input
          type="text"
          value={date?.toISOString()}
          className="hidden"
          disabled
        />
      )}
    </div>
  );
}
