import { SignUpRequest } from '@/types/dto/requests/auth.request.types';
import { SignUpResponse } from '@/types/dto/responses/auth.response.types';
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
