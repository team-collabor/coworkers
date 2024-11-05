import { addUser, signIn } from '@/apis/auth.api';
import { useToast } from '@/hooks/useToast';
import { useAuthStore } from '@/store/useAuthStore';
import {
  SignInRequest,
  SignUpRequest,
} from '@/types/dto/requests/auth.request.types';
import { useMutation } from '@tanstack/react-query';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { authQueryKeys } from './keys/auth.keys';

export const useSignUp = () => {
  const { mutate: signUp, ...returns } = useMutation({
    mutationKey: authQueryKeys.signUp(),
    mutationFn: async (params: SignUpRequest) => {
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
    mutationFn: async (params: SignInRequest) => {
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
    route.replace('/signin');
  };

  return { login, logout, ...returns };
};

export const useGoogleSignIn = () => {
  const { toast } = useToast();
  const { mutate: googleSignIn, ...returns } = useMutation({
    mutationFn: async () => {
      return nextAuthSignIn('google');
    },
    onSuccess: (res) => {
      toast({
        title: '구글 로그인 성공',
        description: `${res?.ok}`,
      });
    },
  });

  return { googleSignIn, ...returns };
};
