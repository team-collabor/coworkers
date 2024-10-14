import dynamic from 'next/dynamic';

import AsideToggle from './ui/aside.toggle';

export const Aside = Object.assign(
  dynamic(async () => (await import('./ui/aside.main')).default, {
    ssr: false,
  }),
  {
    Toggle: AsideToggle,
  }
);
