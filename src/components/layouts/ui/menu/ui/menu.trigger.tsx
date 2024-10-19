import { useMenuStore } from '@/store/useMenuStore';
import { HTMLAttributes } from 'react';

export function MenuTrigger({
  children,
  className,
  id,
  onEvent,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  id: string;
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
        toggle(id);
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
