import type { ReactNode } from 'react';

import { useSidebarStore } from '../model/sidebar.store';

const SidebarToggle = ({ children }: { children?: ReactNode }) => {
  const { toggle } = useSidebarStore();
  return (
    <button
      className="flex items-center justify-center"
      type="button"
      onClick={toggle}
    >
      {children}
    </button>
  );
};

export default SidebarToggle;
