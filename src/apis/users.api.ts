import {
  ResetPasswordRequest,
  SendResetPasswordEmailRequest,
  UpdateUserImageRequest,
  UpdateUserNicknameRequest,
  UpdateUserPasswordRequest,
} from '@/types/dto/requests/users.request.types';
import {
  GetMembershipsResponse,
  GetUserResponse,
  ResetPasswordResponse,
  SendResetPasswordEmailResponse,
  UpdateUserImageResponse,
  UpdateUserNicknameResponse,
  UpdateUserPasswordResponse,
} from '@/types/dto/responses/users.response.types';
import { axiosInstance } from './_axiosInstance';

export const getUser = async () => {
  const response = await axiosInstance<GetUserResponse>({
    method: 'GET',
    url: '/user',
  });
  return response.data;
};

export const getMemberships = async () => {
  const response = await axiosInstance<GetMembershipsResponse>({
    method: 'GET',
    url: '/user/memberships',
  });
  return response.data;
};

export const sendResetPasswordEmail = async (
  params: SendResetPasswordEmailRequest
) => {
  const response = await axiosInstance<SendResetPasswordEmailResponse>({
    method: 'POST',
    url: '/user/send-reset-password-email',
    data: params,
  });
  return response.data;
};

export const resetPassword = async (params: ResetPasswordRequest) => {
  const response = await axiosInstance<ResetPasswordResponse>({
    method: 'PATCH',
    url: '/user/reset-password',
    data: params,
  });
  return response.data;
};

export const deleteUser = async (): Promise<void> => {
  await axiosInstance<void>({
    method: 'DELETE',
    url: '/user',
  });
};

export const updateUserImage = async (params: UpdateUserImageRequest) => {
  const response = await axiosInstance<UpdateUserImageResponse>({
    method: 'PATCH',
    url: '/user',
    data: params,
  });
  return response.data;
};

export const updateUserNickname = async (params: UpdateUserNicknameRequest) => {
  const response = await axiosInstance<UpdateUserNicknameResponse>({
    method: 'PATCH',
    url: '/user',
    data: params,
  });
  return response.data;
};

export const updateUserPassword = async (params: UpdateUserPasswordRequest) => {
  const response = await axiosInstance<UpdateUserPasswordResponse>({
    method: 'PATCH',
    url: '/user/password',
    data: params,
  });
  return response.data;
};
