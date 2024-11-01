import dynamic from 'next/dynamic';
import { MenuTrigger } from './ui/menu.trigger';

export const Menu = Object.assign(
  dynamic(async () => (await import('./ui/menu.main')).MenuMain, {
    ssr: false,
  }),
  {
    Trigger: MenuTrigger,
  }
);
