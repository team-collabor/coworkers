import { cn } from '@/utils/tailwind/cn';
import { forwardRef } from 'react';
import { DatePicker } from './DatePicker';

type DatePickerInputProps = {
  label?: string;
  initialDate?: Date;
  errorMessage?: string;
};

const DatePickerInput = forwardRef((props: DatePickerInputProps, ref) => {
  const { label, initialDate, errorMessage, ...rest } = props;
  return (
    <div className="flex w-full flex-col gap-3">
      {label && <p className="text-lg-medium text-primary">{label}</p>}
      <DatePicker
        mode="input"
        initialDate={initialDate}
        popoverContentClassName="border-[1px] border-green-400"
        ref={ref as React.LegacyRef<HTMLInputElement>}
        {...rest}
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
    </div>
  );
});

export default DatePickerInput;
