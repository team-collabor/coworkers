import { cn } from '@/utils/tailwind/cn';
import Head from 'next/head';
import { ReactNode } from 'react';
import { Toaster } from '../common/Toast/Toaster';
import { useCloseAllDrop } from './lib/use-close-all-drop';
import { Aside, Header } from './ui';

export default function RootLayout({ children }: { children: ReactNode }) {
  useCloseAllDrop();
  return (
    <>
      <Header />
      <Head>
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://coworkers-colla.netlify.app/"
        />
        <meta property="og:image" content="/images/Homepage_img.png" />
      </Head>
      <Aside />
      <div className="h-16" />
      <main
        className={cn([
          'mx-auto flex h-full min-h-screen max-w-[75rem]',
          'flex-col items-center',
          'overflow-auto break-keep tab:mx-6 mob:mx-[0.81rem]',
        ])}
      >
        {children}
      </main>
      <Toaster />
    </>
  );
}
