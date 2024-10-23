import {
  deleteGroup,
  getGroup,
  getInviteGroup,
  getTasks,
  patchGroup,
  postGroup,
  postInviteGroup,
  postTaskList,
} from '@/apis/groups.api';
import {
  InviteGroupRequest,
  PostGroupRequest,
  UpdateGroupRequest,
} from '@/types/dto/requests/group.request.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupsInviteQueryKeys, groupsQueryKeys } from './keys/groups.key';

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
  return useMutation({
    mutationFn: (id: number) => deleteGroup(id),
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

export const useTaskListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { groupId: number; name: string }) =>
      postTaskList(params.groupId, params.name),
    onSuccess: (_, params) => {
      queryClient
        .invalidateQueries({ queryKey: groupsQueryKeys.groups(params.groupId) })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.error('팀 다시 불러오기 오류');
        });
    },
  });
};

export const useTasksQuery = (params: { id: number; date: string }) => {
  return useQuery({
    queryKey: ['groupTask'],
    queryFn: () => getTasks(params.id, params.date),
    enabled: !!params.id && !!params.date,
  });
};
