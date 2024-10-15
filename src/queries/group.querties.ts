import { getGroups } from '@/apis/group.api';
import { FetchQueryOptions } from '@tanstack/react-query';

export const ROOT_GROUP = 'group';

export const getGroupsQuery = <T>(): FetchQueryOptions<T> => ({
  queryKey: [`${ROOT_GROUP}s`],
  queryFn: async ({ signal }): Promise<T> => {
    const data = await getGroups({
      path: `${ROOT_GROUP}s`,
      config: {
        signal,
      },
    });
    return data as T;
  },
});
