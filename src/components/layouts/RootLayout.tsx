import { ReactNode } from 'react';
import { Aside, Header, LayoutProvider } from './ui';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LayoutProvider>
        <Header />
        <Aside />
      </LayoutProvider>
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
