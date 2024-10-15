import { getGroups } from '@/apis/group.api';
import { FetchQueryOptions } from '@tanstack/react-query';

export const ROOT_MEMBERSHIP = 'membership';

export const getMembershipsQuery = <T>(): FetchQueryOptions<T> => ({
  queryKey: [`${ROOT_MEMBERSHIP}s`],
  queryFn: async ({ signal }): Promise<T> => {
    const data = await getGroups({
      path: `${ROOT_MEMBERSHIP}s`,
      config: {
        signal,
      },
    });
    return data as T;
  },
});
