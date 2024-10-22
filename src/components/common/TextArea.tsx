import { CommonTypes } from '@/types/common.types';
import { cn } from '@/utils/tailwind/cn';
import { forwardRef, HTMLAttributes, TextareaHTMLAttributes } from 'react';

type TextAreaProps = Partial<Pick<CommonTypes, 'label' | 'errorMessage'>> & {
  wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
  labelClassName?: HTMLAttributes<HTMLLabelElement>['className'];
  textAreaClassName?: HTMLAttributes<HTMLTextAreaElement>['className'];
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      errorMessage,
      wrapperClassName,
      labelClassName,
      textAreaClassName,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('flex w-full flex-col', wrapperClassName)}>
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

        <textarea
          className={cn(
            'mt-3 w-full rounded-xl bg-secondary px-5 py-[0.875rem]',
            'font-pretendard text-lg-regular text-primary',
            'placeholder:text-default',
            'hover:border-interaction-hover',
            'focus:border-[1px] focus:border-interaction-focus',
            'focus:outline-none',
            errorMessage
              ? 'border-[1px] border-status-danger'
              : 'border-[1px] border-primary',
            textAreaClassName
          )}
          ref={ref}
          id={id}
          {...props}
        />

        {errorMessage && (
          <p
            className="ml-5 mt-3 
						font-pretendard text-md-medium text-status-danger"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export default TextArea;
