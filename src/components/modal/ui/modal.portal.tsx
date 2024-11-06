import { useContextSelector } from '@/hooks/context/use-context-selector';
import { cn } from '@/utils/tailwind/cn';
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
  const component = createPortal(
    <div ref={ref} className={cn('fixed inset-0', className)} {...rest}>
      {children}
    </div>,
    document.body
  );
  return isOpen ? component : null;
}
