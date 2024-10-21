import dynamic from 'next/dynamic';

export const Header = Object.assign(
  dynamic(async () => (await import('./ui/header.main')).default, {
    ssr: false,
  }),
  {}
);
