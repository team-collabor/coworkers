import { useDropStore } from '@/store/useDropStore';
import { useCallback, useEffect } from 'react';

export function useCloseAllDrop() {
  const { hooks, close } = useDropStore();
  const handle = useCallback(
    (e: MouseEvent) => {
      const { target } = e;
      if (
        target &&
        target instanceof HTMLElement &&
        target.getAttribute('aria-label')?.includes(':') &&
        (target.getAttribute('data-hook')?.match(/:/g) || []).length !==
          hooks.length
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
