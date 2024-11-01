import { useMenuStore } from '@/store/useMenuStore';
import { HTMLAttributes } from 'react';

export function MenuTrigger({
  children,
  className,
  menuId,
  onEvent,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  menuId: string;
  onEvent?: () => void;
}) {
  const { toggle } = useMenuStore();
  return (
    <div
      aria-label="menu-trigger"
      className={`hover:opacity-80 ${className ?? ''}`}
      onClick={() => {
        if (onEvent) {
          onEvent();
        }
        toggle(menuId);
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
