import { postImage, postInviteGroup, postTeam } from '@/apis/groups.api';
import { TeamCreate } from '@/types/team';
import { useMutation } from '@tanstack/react-query';

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

export function useInviteGroupMutation() {
  const inviteGroupMutation = useMutation({
    mutationFn: ({ userEmail, token }: { userEmail: string; token: string }) =>
      postInviteGroup(userEmail, token),
  });

  return inviteGroupMutation;
}
