import { TGetPrefetchedUserData } from '@/apis/user.api';
import { Layout } from '@/components/layouts';
import { QueryProvider } from '@/providers/QueryProvider';
import { ROOT_GROUP } from '@/queries/group.querties';
import { ROOT_MEMBERSHIP } from '@/queries/membership.queries';
import { getUserQuery, ROOT_USER } from '@/queries/user.queries';
import '@/styles/globals.css';
import { TResponse } from '@/types/base.types';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';

type CustomAppProps = {
  dehydratedState: DehydratedState;
};

export default function MyApp({
  Component,
  pageProps,
  dehydratedState,
}: AppProps & CustomAppProps) {
  return (
    <QueryProvider>
      <HydrationBoundary state={dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HydrationBoundary>
    </QueryProvider>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps | CustomAppProps> => {
  const ctx = await App.getInitialProps(context);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });
  await queryClient.prefetchQuery(
    getUserQuery<TGetPrefetchedUserData>({ prefetch: true })
  );
  const fetchedData: TResponse<TGetPrefetchedUserData> | undefined =
    queryClient.getQueryData(getUserQuery({ prefetch: true }).queryKey);
  if (fetchedData && fetchedData.data) {
    const { memberships, ...user } = fetchedData.data;
    const groups = memberships.map((m) => m.group);
    queryClient.setQueryData([`${ROOT_USER}`], { data: user });
    queryClient.setQueryData([`${ROOT_MEMBERSHIP}s`], { data: memberships });
    queryClient.setQueryData([`${ROOT_GROUP}s`], { data: groups });
  }
  return { ...ctx, dehydratedState: dehydrate(queryClient) };
};
