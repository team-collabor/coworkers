import { useGetMembershipsQuery, useGetUserQuery } from '@/queries/user';
import { ROOT_MEMBERSHIP } from '@/queries/user/_root.membership';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import { RootContext } from './model/root.context';
import { Aside } from './ui/aside';
import { Header } from './ui/header';

export default function Layout({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const route = useRouter();
  const user = useGetUserQuery();
  if (user.isSuccess && user.data?.data) {
    const { memberships } = user.data.data;
    queryClient.setQueryData([`${ROOT_MEMBERSHIP}s`], { data: memberships });
  }
  const memberships = useGetMembershipsQuery(user.data?.data?.memberships);
  const value = useMemo(
    () => ({
      user: {
        data: user.data?.data,
        error: user.data?.error,
        loading: user.isLoading,
      },
      memberships: {
        data: memberships.data?.data || user.data?.data?.memberships,
        error: memberships.data?.error || user.data?.error,
        loading: memberships.isLoading || user.isLoading,
      },
    }),
    [
      memberships.data?.data,
      memberships.data?.error,
      memberships.isLoading,
      user.data?.data,
      user.data?.error,
      user.isLoading,
    ]
  );
  const { pathname } = route;
  return (
    <RootContext.Provider value={value}>
      {!pathname.startsWith('/sign') && (
        <>
          <Header />
          <Aside />
        </>
      )}
      <div className="h-16" />
      <main
        className="mx-auto flex min-h-screen max-w-[75rem] flex-col items-center
								tab:mx-6 mob:mx-[0.81rem]"
      >
        {children}
      </main>
    </RootContext.Provider>
  );
}
