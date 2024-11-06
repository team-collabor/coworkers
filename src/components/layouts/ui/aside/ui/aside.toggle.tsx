import { useMenuStore } from '@/store/useMenuStore';
import type { HTMLAttributes } from 'react';
import { ASIDE_MENU } from '../../../consts/_aside.menu';

export default function AsideToggle({
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useMenuStore();
  return (
    <button
      aria-label="aside-trigger"
      type="button"
      onClick={() => toggle(ASIDE_MENU)}
      {...rest}
    >
      {children}
    </button>
  );
}
