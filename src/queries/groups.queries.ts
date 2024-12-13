import {
  deleteGroup,
  deleteMember,
  getGroup,
  getInviteGroup,
  getTasks,
  patchGroup,
  postGroup,
  postInviteGroup,
} from '@/apis/groups.api';
import { useGlobalErrorHandler } from '@/hooks/useGlobalErrorHandler';
import { useToast } from '@/hooks/useToast';
import {
  InviteGroupRequest,
  PostGroupRequest,
  UpdateGroupRequest,
} from '@/types/dto/requests/group.request.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  groupsInviteQueryKeys,
  groupsQueryKeys,
  groupTasksQueryKeys,
} from './keys/groups.key';
import { usersQueryKeys } from './keys/users.keys';

export const useTeamQuery = (id: number) => {
  return useQuery({
    queryKey: groupsQueryKeys.groups(id),
    queryFn: () => getGroup(id),
    enabled: !!id,
  });
};

export const usePatchTeamMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const handleError = useGlobalErrorHandler();
  return useMutation({
    mutationFn: ({ id, name, image }: UpdateGroupRequest) =>
      patchGroup({ id, name, ...(image && { image }) }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.memberships(),
      });
      toast({
        title: '해당 팀을 수정했습니다.',
      });
    },
    onError: (error) => handleError(error, '팀 수정을 실패했습니다.'),
  });
};

export const useDeleteTeamMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const handleError = useGlobalErrorHandler();
  return useMutation({
    mutationFn: (id: number) => deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.memberships(),
      });
      toast({
        title: '해당 팀을 삭제했습니다.',
      });
      router.push('/');
    },
    onError: (error) => handleError(error, '팀 삭제를 실패했습니다.'),
  });
};

export const useTeamMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const handleError = useGlobalErrorHandler();
  return useMutation({
    mutationFn: (params: PostGroupRequest) => postGroup(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.memberships(),
      });
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.user(),
      });
      toast({
        title: '해당 팀을 생성했습니다.',
      });
    },
    onError: (error) => handleError(error, '팀 생성을 실패했습니다.'),
  });
};

export const useInviteGroupMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const handleError = useGlobalErrorHandler();
  return useMutation({
    mutationFn: ({ userEmail, token }: InviteGroupRequest) =>
      postInviteGroup({ userEmail, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.memberships(),
      });
      toast({
        title: '팀 참여 완료.',
      });
    },
    onError: (error) => handleError(error, '팀 참여에 실패했습니다.'),
  });
};

export const useInviteGroupQuery = (id: number) => {
  return useQuery({
    queryKey: groupsInviteQueryKeys.inviteGroups(id),
    queryFn: () => getInviteGroup(id),
    enabled: !!id,
  });
};

export const useTasksQuery = (params: { id: number; date: string }) => {
  return useQuery({
    queryKey: groupTasksQueryKeys.Groups(params.id),
    queryFn: () => getTasks(params.id, params.date),
    enabled: !!params.id && !!params.date,
  });
};

export const useDeleteMember = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handleError = useGlobalErrorHandler();
  return useMutation({
    mutationFn: (params: { groupId: number; memberUserId: number }) =>
      deleteMember(params.groupId, params.memberUserId),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(params.groupId),
      });
      toast({
        title: '해당 멤버를 삭제했습니다.',
      });
    },
    onError: (error) => handleError(error, '해당 멤버를 삭제할 수 없습니다.'),
  });
};
