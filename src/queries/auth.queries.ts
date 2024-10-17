import { addUser, signIn } from '@/apis/auth.api';
import { useAuthStore } from '@/store/useAuthStore';
import {
  SignInRequest,
  SignUpRequest,
} from '@/types/dto/requests/auth.request.types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { authQueryKeys } from './keys/auth.keys';

export const useSignUp = () => {
  const { mutate: signUp, ...returns } = useMutation({
    mutationKey: authQueryKeys.signUp(),
    mutationFn: async ({ ...params }: SignUpRequest) => {
      return addUser(params);
    },
    gcTime: 0,
  });

  return { signUp, ...returns };
};

export const useSignIn = () => {
  const route = useRouter();
  const { setUser, setAccessToken, setRefreshToken, clearAuth } =
    useAuthStore();
  const { mutate: login, ...returns } = useMutation({
    mutationKey: authQueryKeys.signIn(),
    mutationFn: async ({ ...params }: SignInRequest) => {
      return signIn(params);
    },
    onSuccess: (res) => {
      if (res) {
        setUser({
          ...res.data.user,
          image: res.data.user.image || '/icons/Member.svg', // 기본 이미지 설정
        });
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
      }
    },
  });

  const logout = () => {
    clearAuth();
    route.reload();
  };

  return { login, logout, ...returns };
};
