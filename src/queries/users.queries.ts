import {
  getHistory,
  getMemberships,
  getUser,
  resetPassword,
  sendResetPasswordEmail,
} from '@/apis/users.api';
import { useToast } from '@/hooks/useToast';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ResetPasswordRequest,
  SendResetPasswordEmailRequest,
} from '@/types/dto/requests/users.request.types';
import {
  GetHistoryResponse,
  GetMembershipsResponse,
  GetUserResponse,
} from '@/types/dto/responses/users.response.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usersQueryKeys } from './keys/users.keys';

export const useGetUser = () => {
  const { setUser } = useAuthStore();
  return useQuery<GetUserResponse>({
    queryKey: usersQueryKeys.user(),
    queryFn: getUser,
    refetchInterval: 1000 * 50,
    select: (data) => {
      setUser(data);
      return data;
    },
    retry: 1,
  });
};

export const useGetMemberships = () => {
  const { user } = useAuthStore();
  return useQuery<GetMembershipsResponse>({
    queryKey: usersQueryKeys.memberships(),
    queryFn: getMemberships,
    enabled: !!user,
  });
};

export const useSendResetPasswordEmail = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (params: SendResetPasswordEmailRequest) =>
      sendResetPasswordEmail(params),
    onSuccess: (response) => {
      toast({
        title: response.message,
      });
    },
    onError: (error) => {
      toast({
        title: '비밀번호 재설정 메일 전송을 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useResetPassword = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (params: ResetPasswordRequest) => resetPassword(params),
    onSuccess: (response) => {
      toast({
        title: '비밀번호 재설정이 완료되었습니다.',
        description: response.message,
      });
    },
    onError: (error) => {
      toast({
        title: '비밀번호 재설정을 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useGetHistory = () => {
  const { user } = useAuthStore();
  const { ...returns } = useQuery<GetHistoryResponse>({
    queryKey: usersQueryKeys.history(),
    queryFn: getHistory,
    enabled: !!user,
    refetchOnMount: 'always',
  });
  return { ...returns };
};
