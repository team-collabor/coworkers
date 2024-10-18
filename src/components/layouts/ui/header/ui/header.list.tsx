import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { ASIDE_MENU } from '@/components/layouts/consts/_aside.menu';
import { findHook } from '@/components/layouts/lib/use-find-hook';
import { UnoptimizedImage } from '@/components/next';
import { useDropStore } from '@/store/useDropStore';
import { Aside } from '../../aside';

export default function HeaderList({
  className,
  ...rest
}: HTMLAttributes<HTMLImageElement>) {
  const { hooks } = useDropStore();
  const isOpen = findHook(hooks, ASIDE_MENU);
  return (
    <Aside.Toggle>
      <UnoptimizedImage
        className={`${clsx(
          'w-6 transition-all duration-500 ease-in-out md:w-0',
          {
            'rotate-90': isOpen,
          }
        )} ${className}`}
        src="/icons/Gnb_menu.svg"
        alt=""
        width={24}
        height={24}
        {...rest}
      />
    </Aside.Toggle>
  );
}
