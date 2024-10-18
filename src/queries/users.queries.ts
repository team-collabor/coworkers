import { getMemberships, getUser } from '@/apis/users.api';
import { useAuthStore } from '@/store/useAuthStore';
import {
  GetMembershipsResponse,
  GetUserResponse,
} from '@/types/dto/responses/users.response.types';
import { useQuery } from '@tanstack/react-query';
import { usersQueryKeys } from './keys/users.keys';

export const useGetUser = () => {
  const { user, setUser } = useAuthStore();
  const { ...returns } = useQuery<GetUserResponse>({
    queryKey: usersQueryKeys.user(),
    queryFn: getUser,
    refetchInterval: 1000 * 50,
    enabled: !!user,
    select: (data) => {
      setUser(data);
      return data;
    },
  });

  return { ...returns };
};

export const useGetMemberships = () => {
  const { user } = useAuthStore();
  const { ...returns } = useQuery<GetMembershipsResponse>({
    queryKey: usersQueryKeys.memberships(),
    queryFn: getMemberships,
    enabled: !!user,
  });

  return { ...returns };
};
