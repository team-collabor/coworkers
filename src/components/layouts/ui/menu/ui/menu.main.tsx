import { findHook } from '@/components/layouts/lib/use-find-hook';
import { useMenuStore } from '@/store/useMenuStore';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export function MenuMain({
  children,
  className,
  menuId,
}: HTMLAttributes<HTMLElement> & {
  menuId: string;
}) {
  const { hooks } = useMenuStore();
  const isOpen = findHook(hooks, menuId);
  return (
    <div
      aria-label="menu-down"
      className={clsx(
        `absolute top-[4rem] -z-10 grid 
        grid-flow-row auto-rows-fr
        rounded-xl border-2 border-primary 
        bg-secondary text-center ${className ?? ''}
        `,
        {
          hidden: !isOpen,
        }
      )}
    >
      {children}
    </div>
  );
}
