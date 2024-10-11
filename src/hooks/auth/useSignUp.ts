import { addUser } from '@/apis/auth.api';
import { SignUpRequest } from '@/types/dto/requests/auth.request.types';
import { useMutation } from '@tanstack/react-query';

const useSignUp = () => {
  const { mutate: signUp, ...returns } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async ({ ...params }: SignUpRequest) => {
      return addUser(params);
    },
    gcTime: 0,
  });

  return { signUp, ...returns };
};

export default useSignUp;
