import { getMemberships } from '@/apis/user';
import { useAuthStore } from '@/store/useAuthStore';
import { TResponse } from '@/types/common';
import { TMemberships } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { ROOT_MEMBERSHIP } from './_root.membership';
import { ROOT_USER } from './_root.user';

export const useGetMembershipsQuery = <T = TResponse<TMemberships>>() => {
  const { user } = useAuthStore();
  return useQuery<T>({
    enabled: !!user,
    retry: 1,
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
