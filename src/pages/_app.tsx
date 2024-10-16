import Layout from '@/components/layouts';
import { QueryProvider } from '@/providers/QueryProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryProvider>
  );
}
