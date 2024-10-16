import { getMemberships, getUser } from '@/apis/user.api';
import { useAuthStore } from '@/store/useAuthStore';
import { TResponse } from '@/types/base.types';
import { TMemberships } from '@/types/membership.types';
import { TUser } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';

export const ROOT_USER = 'user';
export const ROOT_MEMBERSHIP = 'membership';

export const useGetUserQuery = <T = TResponse<TUser>>(
  { prefetch }: { prefetch?: boolean } = { prefetch: false }
) => {
  const { user } = useAuthStore();
  return useQuery<T>({
    enabled: !!user,
    refetchInterval: 1000 * 50,
    queryKey: [ROOT_USER],
    queryFn: async ({ signal }) => {
      const data = await getUser({
        path: `/${ROOT_USER}`,
        config: {
          signal,
        },
      });
      if (!prefetch && data.data) {
        const { memberships, ...rest } = data.data;
        return Promise.resolve({ data: rest }) as T;
      }
      return data as T;
    },
  });
};

export const useGetMembershipsQuery = <T = TResponse<TMemberships>>() => {
  const { user } = useAuthStore();
  return useQuery<T>({
    enabled: !!user,
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
