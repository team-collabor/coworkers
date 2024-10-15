import type { Context, HTMLAttributes } from 'react';

import { useContextSelector } from '@/hooks/context/use-context-selector';
import type { TModalContext } from '../model/modal.context';
import { ModalContext } from '../model/modal.context';

export default function ModalToggle({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useContextSelector(ModalContext as Context<TModalContext>);
  return (
    <button
      type="button"
      className={className}
      onClick={() => toggle()}
      {...rest}
    >
      {children}
    </button>
  );
}
