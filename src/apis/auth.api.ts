import {
  OAuthSignInRequest,
  SignInRequest,
  SignUpRequest,
} from '@/types/dto/requests/auth.request.types';
import {
  RefreshTokenResponse,
  SignInResponse,
  SignUpResponse,
} from '@/types/dto/responses/auth.response.types';
import { axiosInstance } from './_axiosInstance';

export const addUser = async ({ ...params }: SignUpRequest) => {
  if (!params) return;
  const response = await axiosInstance<SignUpResponse>({
    method: 'POST',
    url: '/auth/signUp',
    data: params,
  });
  return response;
};

export const signIn = async ({ ...params }: SignInRequest) => {
  const response = await axiosInstance<SignInResponse>({
    method: 'POST',
    url: '/auth/signIn',
    data: params,
  });
  return response;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axiosInstance<RefreshTokenResponse>({
    method: 'POST',
    url: '/auth/refresh-token',
    data: {
      refreshToken,
    },
  });
  return response;
};

export const oAuthSignIn = async ({ ...params }: OAuthSignInRequest) => {
  const response = await axiosInstance<SignInResponse>({
    method: 'POST',
    url: `/auth/signIn/${params.provider}`,
    data: params.data,
  });
  return response;
};
