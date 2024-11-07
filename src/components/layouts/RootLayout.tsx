import { cn } from '@/utils/tailwind/cn';
import { ReactNode } from 'react';
import { Toaster } from '../common/Toast/Toaster';
import { useCloseAllDrop } from './lib/use-close-all-drop';
import { Aside, Header } from './ui';

export default function RootLayout({ children }: { children: ReactNode }) {
  useCloseAllDrop();
  return (
    <>
      <Header />
      <Aside />
      <div className="h-16" />
      <main
        className={cn([
          'mx-auto flex h-full min-h-screen max-w-[75rem]',
          'flex-col items-center',
          'overflow-auto break-keep tab:mx-6 mob:mx-[0.81rem]',
        ])}
      >
        z{children}
      </main>
      <Toaster />
    </>
  );
}
