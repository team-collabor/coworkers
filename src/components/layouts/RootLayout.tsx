import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className="mx-auto flex min-h-screen max-w-[75rem] flex-col items-center
								tab:mx-6 mob:mx-[0.81rem]"
    >
      {children}
    </main>
  );
}
