import { ReactNode } from 'react';
import { Aside, Header } from './ui';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Aside />
      <div className="h-16" />
      <main
        className="mx-auto flex min-h-screen max-w-[75rem] flex-col items-center
								tab:mx-6 mob:mx-[0.81rem]"
      >
        {children}
      </main>
    </>
  );
}
