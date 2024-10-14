import { getTeams, postImage, postTeam } from '@/apis/groups.api';
import { Team, TeamCreate } from '@/types/team';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useTeamQuery(id: number) {
  const { data: team, isError } = useQuery<Team>({
    queryKey: ['team', id],
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
