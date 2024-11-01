import {
  ResetPasswordRequest,
  SendResetPasswordEmailRequest,
  UpdateUserImageRequest,
  UpdateUserImageUploadRequest,
  UpdateUserNicknameRequest,
  UpdateUserPasswordRequest,
} from '@/types/dto/requests/users.request.types';
import {
  GetHistoryResponse,
  GetMembershipsResponse,
  GetUserResponse,
  ResetPasswordResponse,
  SendResetPasswordEmailResponse,
  UpdateUserImageUploadResponse,
  UpdateUserNicknameResponse,
  UpdateUserPasswordResponse,
  UserImageUpdateResponse,
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

export const getHistory = async () => {
  const response = await axiosInstance<GetHistoryResponse>({
    method: 'GET',
    url: '/user/history',
  });
  return response.data;
};

export const deleteUser = async (): Promise<void> => {
  await axiosInstance<void>({
    method: 'DELETE',
    url: '/user',
  });
};

export const uploadUserImage = async (
  params: UpdateUserImageUploadRequest
): Promise<UpdateUserImageUploadResponse> => {
  const formData = new FormData();
  formData.append('image', params.image);

  const imageResponse = await axiosInstance<UpdateUserImageUploadResponse>({
    method: 'POST',
    url: '/images/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return imageResponse.data; // 이미지 URL 반환
};

// 사용자 이미지 URL을 업데이트하는 함수
export const updateUserImageUrl = async (
  params: UpdateUserImageRequest
): Promise<UserImageUpdateResponse> => {
  const response = await axiosInstance<UserImageUpdateResponse>({
    method: 'PATCH',
    url: '/user',
    data: params,
  });

  return response.data; // 업데이트 결과 반환
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
