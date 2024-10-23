import { CommonTypes } from '@/types/common.types';
import { cn } from '@/utils/tailwind/cn';
import { HTMLAttributes, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '../common/Button/Button';

type TaskFrequencyInputProps = Partial<
  Pick<CommonTypes, 'label' | 'errorMessage'>
> & {
  wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
  labelClassName?: HTMLAttributes<HTMLLabelElement>['className'];
} & React.InputHTMLAttributes<HTMLInputElement>;

function TaskFrequencyInput({
  label,
  errorMessage,
  wrapperClassName,
  labelClassName,
  ...rest
}: TaskFrequencyInputProps) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const formContext = useFormContext();

  return (
    <div className={cn('flex w-full flex-col', wrapperClassName)}>
      {label && (
        <span
          className={cn(
            'font-pretendard text-lg-medium text-primary',
            labelClassName
          )}
        >
          {label}
        </span>
      )}
      <div className="flex gap-1">
        {days.map((day, dayIndex) => (
          <Button
            className={cn(
              'mt-3 h-12 w-11',
              'bg-select hover:bg-interaction-focus',
              'hover:bg-opacity-50 active:bg-opacity-80',
              {
                'bg-interaction-focus hover:bg-opacity-90':
                  weekDays.includes(dayIndex),
              }
            )}
            onClick={() => {
              const newWeekDays = weekDays.includes(dayIndex)
                ? // 이미 존재하면 제거
                  weekDays.filter((prevIndex) => prevIndex !== dayIndex)
                : // 존재하지 않으면 추가
                  [...weekDays, dayIndex];
              setWeekDays(newWeekDays);
              formContext.setValue('weekDays', newWeekDays);
            }}
            key={day}
            buttonStyle={ButtonStyle.Box}
            textColor={TextColor.White}
            textSize={TextSize.Medium}
            buttonBackgroundColor={ButtonBackgroundColor.None}
            buttonWidth={ButtonWidth.Fit}
            buttonBorderColor={ButtonBorderColor.None}
            buttonPadding={ButtonPadding.Medium}
          >
            {day}
          </Button>
        ))}
      </div>
      {errorMessage && (
        <p
          className={cn(
            'ml-5 mt-3 font-pretendard text-md-medium text-status-danger'
          )}
        >
          {errorMessage}
        </p>
      )}
      <Controller
        name="weekDays"
        control={formContext.control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className="hidden"
            value={JSON.stringify(weekDays)}
            name={field.name}
            ref={field.ref}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...rest}
          />
        )}
      />
    </div>
  );
}

export default TaskFrequencyInput;
