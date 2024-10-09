import dynamic from 'next/dynamic';

const SidebarRoot = dynamic(() => import('./ui/Sidebar.root'));
const SidebarToggle = dynamic(() => import('./ui/Sidebar.toggle'));

export const Sidebar = {
  Root: SidebarRoot,
  Toggle: SidebarToggle,
};
