import dynamic from 'next/dynamic';

const SidebarRoot = dynamic(() => import('./ui/sidebar.root'));
const SidebarToggle = dynamic(() => import('./ui/sidebar.toggle'));

export const Sidebar = {
  Root: SidebarRoot,
  Toggle: SidebarToggle,
};
