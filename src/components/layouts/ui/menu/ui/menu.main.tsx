import { findHook } from '@/components/layouts/lib/use-find-hook';
import { useMenuStore } from '@/store/useMenuStore';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export function MenuMain({
  children,
  className,
  id,
}: HTMLAttributes<HTMLElement> & {
  id: string;
}) {
  const { hooks } = useMenuStore();
  const isOpen = findHook(hooks, id);
  return (
    <div
      aria-label="menu-down"
      className={clsx(
        `absolute top-[4rem] -z-10 grid 
        grid-flow-row auto-rows-fr overflow-hidden
        rounded-xl border-2 border-primary 
        bg-secondary text-center transition-all 
        duration-200 ease-in-out ${className ?? ''}
        `,
        {
          'h-1 -translate-y-[50%]': !isOpen,
        }
      )}
    >
      {children}
    </div>
  );
}
