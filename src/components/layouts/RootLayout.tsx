import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="tab:mx-6 mob:mx-[0.81rem] ove mx-auto flex min-h-screen max-w-[75rem] flex-col items-center">
      {children}
    </main>
  );
}
