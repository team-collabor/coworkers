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

export const useTeamQuery = (id: number) => {
  return useQuery({
    queryKey: groupsQueryKeys.groups(id),
    queryFn: () => getGroup(id),
    enabled: !!id,
  });
};

export const usePatchTeamMutation = () => {
  return useMutation({
    mutationFn: ({ id, name, image }: UpdateGroupRequest) =>
      patchGroup({ id, name, ...(image && { image }) }),
  });
};

export const useDeleteTeamMutation = () => {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (id: number) => deleteGroup(id),
    onSuccess: () => {
      toast({
        title: '해당 팀을 삭제했습니다.',
      });
      router.push('/');
    },
    onError: (error) => {
      toast({
        title: '팀 삭제에 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useTeamMutation = () => {
  return useMutation({
    mutationFn: (params: PostGroupRequest) => postGroup(params),
  });
};

export const useInviteGroupMutation = () => {
  return useMutation({
    mutationFn: ({ userEmail, token }: InviteGroupRequest) =>
      postInviteGroup({ userEmail, token }),
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
    onError: (error) => {
      toast({
        title: '멤버 삭제할 수 없습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
