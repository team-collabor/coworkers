import { CommonTypes } from '@/types/common.types';
import { cn } from '@/utils/tailwind/Cn';
import Image from 'next/image';
import {
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';

type InputProps = Partial<Pick<CommonTypes, 'label' | 'errorMessage'>> & {
  wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
  labelClassName?: HTMLAttributes<HTMLLabelElement>['className'];
  inputClassName?: HTMLAttributes<HTMLInputElement>['className'];
  inputWrapperClassName?: HTMLAttributes<HTMLInputElement>['className'];
  sideButton?: ReactNode;
  hasVisibilityButton?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      sideButton,
      hasVisibilityButton,
      wrapperClassName,
      labelClassName,
      inputClassName,
      inputWrapperClassName,
      type,
      id,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className={cn('relative w-full', wrapperClassName)}>
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
        <div
          className={cn('relative', label ? 'mt-3' : '', inputWrapperClassName)}
        >
          <input
            className={cn(
              'w-full rounded-xl bg-secondary px-5 py-[0.875rem]',
              'font-pretendard text-lg-regular text-primary',
              'placeholder:text-default',
              'hover:border-interaction-hover',
              'focus:border-[1px] focus:border-interaction-focus',
              'focus:outline-none',
              errorMessage
                ? 'border-[1px] border-status-danger'
                : 'border-[1px] border-primary',
              sideButton && 'pr-28',
              hasVisibilityButton && 'pr-12',
              type === 'password' && 'font-verdana placeholder:font-pretendard',
              inputClassName
            )}
            ref={ref}
            id={id}
            type={type === 'password' && isVisible ? 'text' : type}
            {...props}
          />
          {hasVisibilityButton && (
            <div
              className="absolute right-4 top-8
								-translate-y-1/2 transform"
            >
              <button
                type="button"
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              >
                {isVisible ? (
                  <Image
                    src="/icons/Visibility_on.svg"
                    alt="비밀번호 보임 아이콘"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/icons/Visibility_off.svg"
                    alt="비밀번호 보이지 않음 아이콘"
                    width={24}
                    height={24}
                  />
                )}
              </button>
            </div>
          )}
          {sideButton && (
            <div
              className="absolute right-2 top-1/2 
							-translate-y-1/2 transform"
            >
              {sideButton}
            </div>
          )}
        </div>
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

export default Input;
