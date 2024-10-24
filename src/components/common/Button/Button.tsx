import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export enum ButtonStyle {
  Box = 'box',
  Floating = 'floating',
}
export enum TextColor {
  White = 'white',
  Green = 'green',
  Gray = 'gray',
}
export enum TextSize {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}
export enum ButtonWidth {
  Full = 'full',
  Fit = 'fit',
}
export enum ButtonBackgroundColor {
  Green = 'green',
  White = 'white',
  Gray = 'gray',
  Red = 'red',
  None = 'none',
}
export enum ButtonBorderColor {
  Green = 'green',
  Gray = 'gray',
  LightGray = 'light-gray',
  None = 'none',
}
export enum ButtonPadding {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
  ExtraSmall = 'xs',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  buttonStyle: ButtonStyle;
  textColor: TextColor;
  textSize: TextSize;
  buttonWidth?: ButtonWidth;
  buttonBackgroundColor: ButtonBackgroundColor;
  buttonBorderColor: ButtonBorderColor;
  buttonPadding: ButtonPadding;
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
          'gap-2.5 rounded-xl  py-3.5 text-lg-semibold':
            buttonStyle === ButtonStyle.Box,
          'gap-1 rounded-full px-5 py-3.5':
            buttonStyle === ButtonStyle.Floating,
          // buttonBackgroundColor
          [`bg-brand-primary hover:bg-interaction-hover
            active:bg-interaction-pressed disabled:bg-interaction-inactive`]:
            buttonBackgroundColor === ButtonBackgroundColor.Green,
          'bg-inverse': buttonBackgroundColor === ButtonBackgroundColor.White,
          'bg-icon-primary':
            buttonBackgroundColor === ButtonBackgroundColor.Gray,
          'bg-status-danger':
            buttonBackgroundColor === ButtonBackgroundColor.Red,
          'bg-transparent':
            buttonBackgroundColor === ButtonBackgroundColor.None,
          // textColor
          'text-default': textColor === TextColor.Gray,
          'text-inverse': textColor === TextColor.White,
          [`text-brand-primary hover:text-interaction-hover
            active:text-interaction-pressed
            disabled:text-interaction-inactive`]: textColor === TextColor.Green,
          // textSize
          'text-lg-semibold': textSize === TextSize.Large,
          'text-md-semibold': textSize === TextSize.Medium,
          'text-sm-semibold': textSize === TextSize.Small,
          // buttonWidth
          'w-full': buttonWidth === ButtonWidth.Full,
          'w-fit': buttonWidth === ButtonWidth.Fit,
          // buttonBorderColor
          [`border-brand-primary hover:border-interaction-hover
            active:border-interaction-pressed
          disabled:border-interaction-inactive`]:
            buttonBorderColor === ButtonBorderColor.Green,
          'border-primary': buttonBorderColor === ButtonBorderColor.Gray,
          [`border-icon-primary hover:border-icon-inverse
            active:border-tertiary`]:
            buttonBorderColor === ButtonBorderColor.LightGray,
          'border-none': buttonBorderColor === ButtonBorderColor.None,
          // buttonPadding
          'px-5 py-3.5': buttonPadding === ButtonPadding.Large,
          'px-4 py-2.5': buttonPadding === ButtonPadding.Medium,
          'px-3 py-[0.375rem]': buttonPadding === ButtonPadding.Small,
          'px-1.5 py-2': buttonPadding === ButtonPadding.ExtraSmall,
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
