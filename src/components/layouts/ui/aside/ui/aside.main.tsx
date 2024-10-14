/* eslint-disable max-len */
import clsx from 'clsx';

import { UnoptimizedImage } from '@/components/common/next';
import { useAsideStore } from '../model/aside.store';
import AsideNav from './aside.nav';
import AsideToggle from './aside.toggle';

export default function AsideMain() {
  const { openState } = useAsideStore();
  return (
    <aside
      className={clsx(
        'fixed inset-y-0 w-1/3 min-w-max max-w-60 bg-tertiary',
        'z-40 overflow-auto transition-all duration-500 ease-in-out',
        {
          '-translate-x-full': !openState,
          'md:-translate-x-full': openState,
        }
      )}
    >
      <div className="mt-16 flex flex-col">
        <AsideToggle className="fixed z-10 self-end bg-tertiary p-4">
          <UnoptimizedImage src="/icons/X.svg" alt="" width={24} height={24} />
        </AsideToggle>
        <AsideNav />
      </div>
    </aside>
  );
}
