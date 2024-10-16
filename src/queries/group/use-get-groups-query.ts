import { getGroups } from '@/apis/group';
import { TResponse } from '@/types/common';
import { TGroups } from '@/types/group';
import { useQuery } from '@tanstack/react-query';
import { ROOT_GROUP } from './_root.group';

export const useGetGroupsQuery = <T = TResponse<TGroups>>() => {
  return useQuery<T>({
    queryKey: [`${ROOT_GROUP}s`],
    queryFn: async ({ signal }): Promise<T> => {
      const data = await getGroups({
        path: `/${ROOT_GROUP}s`,
        config: {
          signal,
        },
      });
      return data as T;
    },
  });
};
