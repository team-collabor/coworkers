import { getMembershipsQuery } from '@/queries/membership.queries';
import { getUserQuery } from '@/queries/user.queries';
import { TResponse } from '@/types/base.types';
import { TMemberships } from '@/types/membership.types';
import { TUser } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';
import { LayoutContext } from './model/layout.context';
import { Aside } from './ui/aside';
import { Header } from './ui/header';

export default function Layout({ children }: { children: ReactNode }) {
  const { data: user } = useQuery(
    getUserQuery<TResponse<TUser>>({ prefetch: false })
  );
  const { data: memberships } = useQuery(
    getMembershipsQuery<TResponse<TMemberships>>()
  );
  const value = useMemo(
    () => ({
      user,
      memberships,
    }),
    [user, memberships]
  );
  return (
    <LayoutContext.Provider value={value}>
      <Header />
      <Aside />
      <div className="h-16" />
      <main
        className="mx-auto flex min-h-screen max-w-[75rem] flex-col items-center
								tab:mx-6 mob:mx-[0.81rem]"
      >
        {children}
      </main>
    </LayoutContext.Provider>
  );
}
