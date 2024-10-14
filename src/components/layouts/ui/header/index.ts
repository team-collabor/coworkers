import dynamic from 'next/dynamic';

/**
 * 헤더 컴포넌트
 */
export const Header = Object.assign(
  dynamic(async () => (await import('./ui/header.main')).default, {
    ssr: false,
  }),
  {}
);
