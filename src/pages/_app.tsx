import GoogleAuth from '@/components/auth/signin/GoogleAuth';
import RootLayout from '@/components/layouts/RootLayout';
import { OAuthProvider } from '@/providers/OAuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import '@/styles/globals.css';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session as Session}>
      <QueryProvider>
        <OAuthProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </OAuthProvider>
        <GoogleAuth />
      </QueryProvider>
    </SessionProvider>
  );
}
