import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { UnoptimizedImage } from '../../UnoptimizedImage';
import { useModalContext } from '../model/Modal.context';

function ModalFrame({
  children,
  useClose,
}: {
  children?: ReactNode;
  useClose?: boolean;
}) {
  const { isClosed, delModal } = useModalContext();
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.style.top = `${window.scrollY}px`;
      document.body.style.overflow = !isClosed ? 'hidden' : 'scroll';
    }
  });
  return createPortal(
    <div
      className={clsx('size-screen absolute', {
        hidden: isClosed,
      })}
      ref={frameRef}
    >
      <div className="relative size-full bg-black opacity-60" />
      <div
        className={`
          absolute bottom-0 left-1/2 
          z-10 w-full -translate-x-1/2 rounded-t-xl bg-secondary 
          p-4 pb-8 sm:bottom-auto sm:top-1/2 sm:max-w-max sm:-translate-y-1/2 
          sm:rounded-xl
        `}
      >
        <UnoptimizedImage
          className={clsx('absolute right-4 z-20 cursor-pointer', {
            hidden: !useClose,
          })}
          src="/icons/X.svg"
          alt=""
          width={24}
          height={24}
          onClick={() => delModal()}
        />
        <div
          className={`
          relative grid grid-flow-row auto-rows-auto gap-y-2 px-9 pb-0 pt-8
          `}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ModalFrame;
