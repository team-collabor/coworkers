import { cn } from '@/utils/tailwind/cn';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { DatePicker } from './DatePicker';

type DatePickerInputProps = {
  label?: string;
  initialDate?: Date;
  errorMessage?: string;
};

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({ label, initialDate, errorMessage, ...rest }, ref) => {
    const formContext = useFormContext();

    return (
      <div className="flex w-full flex-col gap-3">
        {label && <p className="text-lg-medium text-primary">{label}</p>}
        <DatePicker
          mode="input"
          initialDate={initialDate}
          popoverContentClassName="border-[1px] border-green-400"
          onDateChange={(date) => {
            formContext.setValue('startDate', date.toLocaleDateString('ko-KR'));
          }}
          ref={ref as React.LegacyRef<HTMLInputElement>}
        />
        {errorMessage && (
          <p
            className={cn(
              'ml-5 mt-3 font-pretendard text-md-medium text-status-danger'
            )}
          >
            {errorMessage}
          </p>
        )}
        <input
          type="text"
          value={new Date(
            formContext.watch('startDate') as string
          ).toLocaleDateString('ko-KR')}
          className="hidden"
          ref={ref}
          suppressHydrationWarning
          {...rest}
        />
      </div>
    );
  }
);

export default DatePickerInput;
