import { FetchQueryOptions, QueryFunctionContext } from '@tanstack/react-query';

export const groupsQueries = () => ({
  root: () => ['/groups'],
  lists: (id: string | number) => [groupsQueries().root(), id],
  list: (id: string | number): FetchQueryOptions => ({
    queryKey: [groupsQueries().lists(id)],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: async ({ signal }: QueryFunctionContext) => {},
  }),
});
