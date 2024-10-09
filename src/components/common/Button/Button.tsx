import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  buttonStyle: 'box' | 'floating';
  textColor: 'white' | 'green' | 'gray';
  textSize: 'lg' | 'md' | 'sm';
  buttonWidth: 'full' | 'fit';
  buttonBackgroundColor: 'green' | 'white' | 'red' | 'none';
  buttonBorderColor: 'green' | 'gray' | 'none';
  buttonPadding: 'lg' | 'md' | 'sm' | 'xs';
  type?: 'button' | 'submit';
  className?: string;
};

function Button({
  children,
  buttonStyle,
  buttonBackgroundColor,
  buttonBorderColor,
  buttonWidth,
  textColor,
  textSize,
  buttonPadding,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={clsx(
        'flex items-center justify-center break-keep border-[1px] border-solid',
        {
          // buttonStyle
          'gap-2.5 rounded-xl  py-3.5 text-lg-semibold': buttonStyle === 'box',
          'gap-1 rounded-full px-5 py-3.5': buttonStyle === 'floating',
          // buttonBackgroundColor
          [`bg-brand-primary hover:bg-interaction-hover
            active:bg-interaction-pressed disabled:bg-interaction-inactive`]:
            buttonBackgroundColor === 'green',
          'bg-inverse': buttonBackgroundColor === 'white',
          'bg-status-danger': buttonBackgroundColor === 'red',
          'bg-transparent': buttonBackgroundColor === 'none',
          // textColor
          'text-default': textColor === 'gray',
          'text-inverse': textColor === 'white',
          [`text-brand-primary hover:text-interaction-hover
            active:text-interaction-pressed
            disabled:text-interaction-inactive`]: textColor === 'green',
          // textSize
          'text-lg-semibold': textSize === 'lg',
          'text-md-semibold': textSize === 'md',
          'text-sm-semibold': textSize === 'sm',
          // buttonWidth
          'w-full': buttonWidth === 'full',
          'w-fit': buttonWidth === 'fit',
          // buttonBorderColor
          [`border-brand-primary hover:border-interaction-hover
            active:border-interaction-pressed
          disabled:border-interaction-inactive`]: buttonBorderColor === 'green',
          'border-primary': buttonBorderColor === 'gray',
          'border-none': buttonBorderColor === 'none',
          // buttonPadding
          'px-5 py-3.5': buttonPadding === 'lg',
          'px-4 py-2.5': buttonPadding === 'md',
          'px-3 py-[0.375rem]': buttonPadding === 'sm',
          'px-1.5 py-2': buttonPadding === 'xs',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
