import {
  getInviteGroup,
  getTeams,
  postImage,
  postTaskList,
  postTeam,
} from '@/apis/groups.api';
import { Team, TeamCreate } from '@/types/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useTeamQuery(id: number) {
  const { data: team, isError } = useQuery<Team>({
    queryKey: ['team'],
    queryFn: () => getTeams(id),
    enabled: !!id, // id가 있을 때만 쿼리를 실행
  });

  return { team, isError };
}

export function useUploadImageMutation() {
  const uploadImageMutation = useMutation({
    mutationFn: (image: File) => postImage(image),
  });

  return uploadImageMutation;
}

export function useTeamMutation() {
  const signUpTeamMutation = useMutation({
    mutationFn: ({ name, image }: TeamCreate) => postTeam({ name, image }),
  });

  return signUpTeamMutation;
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
