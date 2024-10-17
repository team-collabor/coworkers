import { CommonTypes } from '@/types/common.types';
import { cn } from '@/utils/tailwind/cn';
import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

type SelectProps = Partial<Pick<CommonTypes, 'label' | 'errorMessage'>> & {
  wrapperClassName?: HTMLAttributes<HTMLSelectElement>['className'];
  labelClassName?: HTMLAttributes<HTMLSelectElement>['className'];
  selectClassName?: HTMLAttributes<HTMLSelectElement>['className'];
  children: ReactNode;
} & InputHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      errorMessage,
      wrapperClassName,
      labelClassName,
      selectClassName,
      children,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('flex w-full flex-col gap-3', wrapperClassName)}>
        {label && (
          <label
            className={cn(
              'font-pretendard text-lg-medium text-primary',
              labelClassName
            )}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <select
          className={cn(
            'w-full rounded-xl bg-secondary py-[0.875rem] pl-5 pr-12',
            'overflow-hidden font-pretendard text-lg-regular text-primary',
            'placeholder:text-default',
            'hover:border-interaction-hover',
            'focus:border-[1px] focus:border-interaction-focus',
            'focus:outline-none',
            errorMessage
              ? 'border-[1px] border-status-danger'
              : 'border-[1px] border-primary',
            selectClassName
          )}
          ref={ref}
          id={id}
          {...props}
        >
          {children}
        </select>
        {errorMessage && (
          <p className="ml-5 font-pretendard text-md-medium text-status-danger">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export default Select;
