import { FetchQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { getGroups } from '../api/get-groups';
import { TGroups } from './types';

export const groupsQueries = () => ({
  root: () => ['/groups'],
  lists: (id: string | number) => [...groupsQueries().root(), id],
  list: (id: string | number): FetchQueryOptions<TGroups> => ({
    queryKey: [...groupsQueries().lists(id)],
    queryFn: async ({ signal }: QueryFunctionContext): Promise<TGroups> => {
      const response = getGroups(id, signal);
      return response;
    },
  }),
});
