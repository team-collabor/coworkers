import { FetchQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { getGroups } from '../api/get-groups';

export const groupsQueries = () => ({
  root: () => ['/groups'],
  lists: (id: string | number) => [groupsQueries().root(), id],
  list: (id: string | number): FetchQueryOptions => ({
    queryKey: [groupsQueries().lists(id)],
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const response = getGroups(id, signal);
      return response;
    },
  }),
});
