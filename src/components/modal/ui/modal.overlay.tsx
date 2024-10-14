import type { Context, HTMLAttributes } from 'react';

import { useContextSelector } from '@/hooks/context/use-context-selector';
import { ModalContext, type TModalContext } from '../model/modal.context';

export default function ModalOverlay({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const defaultClassName = 'fixed inset-0 bg-black opacity-30';
  const { toggle } = useContextSelector(ModalContext as Context<TModalContext>);
  return (
    <div
      className={`${defaultClassName} ${className}`}
      {...rest}
      onClick={toggle}
    >
      {children}
    </div>
  );
}
