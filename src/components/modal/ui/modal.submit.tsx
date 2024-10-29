import type { Context, HTMLAttributes } from 'react';

import { useContextSelector } from '@/hooks/context/use-context-selector';
import type { TModalContext } from '../model/modal.context';
import { ModalContext } from '../model/modal.context';

export default function ModalSubmit({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const { toggle } = useContextSelector(ModalContext as Context<TModalContext>);

  return (
    <div className={className} onClick={() => toggle()} {...rest}>
      {children}
    </div>
  );
}
