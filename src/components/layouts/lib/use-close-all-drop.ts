import { useMenuStore } from '@/store/useMenuStore';
import { useCallback, useEffect } from 'react';

export function useCloseAllDrop() {
  const { hooks, close } = useMenuStore();
  const handle = useCallback(
    (e: MouseEvent) => {
      const { target } = e;
      if (
        hooks.length >= 1 &&
        target &&
        target instanceof HTMLElement &&
        !target.closest('[aria-label="menu-trigger"]') &&
        !target.closest('[aria-label="menu-down"]') &&
        !target.closest('[aria-label="aside-trigger"]')
      ) {
        close();
      }
    },
    [close, hooks.length]
  );
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handle);
      return () => {
        window.removeEventListener('click', handle);
      };
    }
  }, [handle]);
}
