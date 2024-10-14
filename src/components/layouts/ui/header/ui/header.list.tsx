import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { UnoptimizedImage } from '@/components/common/next';
import { Aside } from '../../aside';
import { useAsideStore } from '../../aside/model/aside.store';

export default function HeaderList({
  className,
  ...rest
}: HTMLAttributes<HTMLImageElement>) {
  const { openState } = useAsideStore();
  return (
    <Aside.Toggle>
      <UnoptimizedImage
        className={`${clsx(
          'w-6 transition-all duration-500 ease-in-out md:w-0',
          {
            'rotate-90': openState,
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
