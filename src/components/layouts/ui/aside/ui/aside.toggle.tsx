import { useDropStore } from '@/store/useDropStore';
import type { HTMLAttributes } from 'react';
import { ASIDE_MENU } from '../../../consts/_aside.menu';

export default function AsideToggle({
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useDropStore();
  return (
    <button type="button" onClick={() => toggle(ASIDE_MENU)} {...rest}>
      {children}
    </button>
  );
}
