import { getUser } from '@/apis/user';
import { useAuthStore } from '@/store/useAuthStore';
import { TResponse } from '@/types/common';
import { TUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { ROOT_USER } from './_root.user';

export const useGetUserQuery = <T = TResponse<TUser>>(
  { prefetch }: { prefetch?: boolean } = { prefetch: false }
) => {
  const { user } = useAuthStore();
  return useQuery<T>({
    enabled: !!user,
    retry: 1,
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
