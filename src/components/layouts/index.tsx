import { ReactNode } from 'react';
import { Aside } from './ui/aside';
import { Header } from './ui/header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="h-16" />
      <main
        className="mx-auto flex min-h-screen max-w-[75rem] flex-col items-center
								tab:mx-6 mob:mx-[0.81rem]"
      >
        <Header />
        <Aside />
        {children}
      </main>
    </>
  );
}
