import {
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
  const response = await axiosInstance.post<SignUpResponse>(
    '/auth/signUp',
    params
  );
  return response;
};

export const signIn = async ({ ...params }: SignInRequest) => {
  const response = await axiosInstance.post<SignInResponse>(
    '/auth/signIn',
    params
  );
  return response;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axiosInstance.post<RefreshTokenResponse>(
    '/auth/refresh-token',
    {
      refreshToken,
    }
  );
  return response;
};
