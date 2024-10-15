import { getMembershipsQuery, getUserQuery } from '@/queries/user.queries';
import { TResponse } from '@/types/base.types';
import { TMemberships } from '@/types/membership.types';
import { TUser } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import { RootContext } from './model/root.context';
import { Aside } from './ui/aside';
import { Header } from './ui/header';

export default function Layout({ children }: { children: ReactNode }) {
  const route = useRouter();
  const user = useQuery(getUserQuery<TResponse<TUser>>({ prefetch: false }));
  const memberships = useQuery(getMembershipsQuery<TResponse<TMemberships>>());
  const value = useMemo(
    () => ({
      user: {
        data: user.data,
        loading: user.isLoading,
      },
      memberships: {
        data: memberships.data,
        loading: memberships.isLoading,
      },
    }),
    [user, memberships]
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
