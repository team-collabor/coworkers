import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, useMemo } from 'react';
import { LayoutContext } from '../model/layout.context';
import { groupsQueries } from '../model/layout.queries';
import { TGroups } from '../model/types';

export default function LayoutProvider({ children }: PropsWithChildren) {
  const { data, isLoading, isSuccess, isError } = useQuery<TGroups>(
    groupsQueries().list(1)
  );
  const value = useMemo(
    () => ({
      data,
      isLoading,
      isSuccess,
      isError,
    }),
    [data, isError, isLoading, isSuccess]
  );
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
