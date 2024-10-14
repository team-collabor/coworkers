import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, useMemo } from 'react';
import { LayoutContext } from '../model/layout.context';
import { groupsQueries } from '../model/layout.queries';
import { TGroups } from '../model/types';

export default function LayoutQueryProvider({ children }: PropsWithChildren) {
  const { user } = useAuthStore();
  const groups = useQuery<TGroups>(groupsQueries().list(1));
  const value = useMemo(() => ({ groups, user }), [groups, user]);
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
