import { getUser } from '@/apis/user';
import { TGetUser } from '@/apis/user/get-user';
import { useAuthStore } from '@/store/useAuthStore';
import { TResponse } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import { ROOT_USER } from './_root.user';

export const useGetUserQuery = () => {
  const { user: authUser } = useAuthStore();
  return useQuery({
    enabled: !!authUser,
    refetchInterval: 1000 * 50,
    queryKey: [ROOT_USER],
    queryFn: ({ signal }): Promise<TResponse<TGetUser>> => {
      return getUser({
        path: `/${ROOT_USER}`,
        config: {
          signal,
        },
      });
    },
  });
};
