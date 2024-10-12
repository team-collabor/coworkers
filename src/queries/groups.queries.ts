import { postImage, postTeam } from '@/apis/groups.api';
import { Team } from '@/types/team';
import { useMutation } from '@tanstack/react-query';

export function useUploadImageMutation() {
  const uploadImageMutation = useMutation({
    mutationFn: (image: File) => postImage(image),
  });

  return uploadImageMutation;
}

export function useTeamMutation() {
  const signUpTeamMutation = useMutation({
    mutationFn: ({ name, image }: Team) => postTeam({ name, image }),
    // onSuccess: (data) => {
    //   // 생성된 팀 ID를 콘솔에 출력
    //   console.log('생성된 팀 ID:', data);
    // },
    // onError: (error) => {
    //   console.error('팀 생성에 실패했습니다:', error);
    // },
  });

  return signUpTeamMutation;
}
