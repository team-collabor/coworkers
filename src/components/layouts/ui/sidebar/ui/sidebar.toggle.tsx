import type { ReactNode } from 'react';
import { SidebarStore } from '../model/Sidebar.store';

function SidebarToggle({ children }: { children?: ReactNode }) {
  const { toggle } = SidebarStore();
  return (
    <button
      className="flex items-center justify-center"
      type="button"
      onClick={toggle}
    >
      {children}
    </button>
  );
}

export default SidebarToggle;
