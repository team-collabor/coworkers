import { useContextSelector } from '@/hooks/context/use-context-selector';
import { Context, HTMLAttributes, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext, TModalContext } from '../model/modal.context';

export default function ModalPortal({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useContextSelector(ModalContext as Context<TModalContext>);
  const ref = useRef<HTMLDivElement>(null);
  const defaultClassName = 'fixed bottom-0 inset-x-0 sm:inset-0';
  const component = createPortal(
    <div ref={ref} className={`${defaultClassName} ${className}`} {...rest}>
      {children}
    </div>,
    document.body
  );
  return isOpen ? component : null;
}
