import type { HTMLAttributes } from 'react';

import { useAsideStore } from '../model/aside.store';

export default function AsideToggle({
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useAsideStore();
  return (
    <button type="button" onClick={() => toggle()} {...rest}>
      {children}
    </button>
  );
}
