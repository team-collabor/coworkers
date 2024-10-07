import RootLayout from '@/components/layouts/RootLayout';
import { QueryProvider } from '@/providers/QueryProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </QueryProvider>
  );
}
