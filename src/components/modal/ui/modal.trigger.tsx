import type { Context, HTMLAttributes } from 'react';

import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import { useContextSelector } from '@/hooks/context/use-context-selector';
import { cn } from '@/utils/tailwind/cn';
import type { TModalContext } from '../model/modal.context';
import { ModalContext } from '../model/modal.context';

export default function ModalTrigger({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useContextSelector(ModalContext as Context<TModalContext>);
  return (
    <Button
      type="button"
      className={cn(
        'fixed bottom-[5vh] right-[10vw]',
        'tab:bottom-7 tab:right-10',
        'mob:bottom-[1.44rem] mob:right-7',
        className
      )}
      buttonStyle={ButtonStyle.Floating}
      buttonWidth={ButtonWidth.Fit}
      buttonPadding={ButtonPadding.Large}
      buttonBackgroundColor={ButtonBackgroundColor.Green}
      textColor={TextColor.White}
      textSize={TextSize.Large}
      buttonBorderColor={ButtonBorderColor.None}
      onClick={() => toggle()}
      {...rest}
    >
      {children}
    </Button>
  );
}
