import {
  deleteTeam,
  getInviteGroup,
  getTasks,
  getTeams,
  patchTeam,
  postInviteGroup,
  postTaskList,
  postTeam,
} from '@/apis/groups.api';
import { Team, TeamCreate } from '@/types/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useTeamQuery(id: number) {
  const {
    data: team,
    isError,
    isLoading,
    isFetched,
  } = useQuery<Team>({
    queryKey: ['team'],
    queryFn: () => getTeams(id),
    enabled: !!id, // id가 있을 때만 쿼리를 실행
  });

  return { team, isError, isLoading, isFetched };
}

export function usePatchTeamMutation() {
  const patchTeamMutation = useMutation({
    mutationFn: ({
      id,
      name,
      image,
    }: {
      id: number;
      name: string;
      image?: string;
    }) => patchTeam(id, { name, ...(image && { image }) }),
  });

  return patchTeamMutation;
}

export function useDeleteTeamMutation() {
  const deleteTeamMutation = useMutation({
    mutationFn: (id: number) => deleteTeam(id),
  });

  return deleteTeamMutation;
}

export function useTeamMutation() {
  const signUpTeamMutation = useMutation({
    mutationFn: ({ name, image }: TeamCreate) => postTeam({ name, image }),
  });

  return signUpTeamMutation;
}

export function useInviteGroupMutation() {
  const inviteGroupMutation = useMutation({
    mutationFn: ({ userEmail, token }: { userEmail: string; token: string }) =>
      postInviteGroup(userEmail, token),
  });

  return inviteGroupMutation;
}
export function useTaskListMutation() {
  const queryClient = useQueryClient();
  const taskListMutation = useMutation({
    mutationFn: ({ groupId, name }: { groupId: number; name: string }) =>
      postTaskList(groupId, name),
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ['team'] })
        .then(() => {
          // 성공적으로 무효화된 경우 처리 로직
        })
        .catch(() => {
          // 오류 발생 시 처리 로직
        });
    },
  });

  return taskListMutation;
}

export function useInviteGroupQuery(id: number) {
  const inviteGroupQuery = useQuery({
    queryKey: ['inviteGroup', id],
    queryFn: () => getInviteGroup(id),
    enabled: !!id,
  });

  return inviteGroupQuery;
}

export function useTasksQuery(id: number, date: string) {
  const task = useQuery({
    queryKey: ['groupTask'],
    queryFn: () => getTasks(id, date),
    enabled: !!id,
  });

  return task;
}
