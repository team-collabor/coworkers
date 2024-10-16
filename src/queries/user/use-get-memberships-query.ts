import { getMemberships } from '@/apis/user';
import { TResponse } from '@/types/common';
import { TGroup } from '@/types/group';
import { TMembership, TMemberships } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { ROOT_MEMBERSHIP } from './_root.membership';
import { ROOT_USER } from './_root.user';

export const useGetMembershipsQuery = <T = TResponse<TMemberships>>(
  prefetchedMemberships?: Array<
    TMembership & {
      group: TGroup;
    }
  >
) => {
  return useQuery<T>({
    enabled: !!prefetchedMemberships,
    refetchInterval: 1000 * 50,
    queryKey: [`${ROOT_MEMBERSHIP}s`],
    queryFn: async ({ signal }): Promise<T> => {
      const data = await getMemberships({
        path: `/${ROOT_USER}/${ROOT_MEMBERSHIP}s`,
        config: {
          signal,
        },
      });
      return data as T;
    },
  });
};
