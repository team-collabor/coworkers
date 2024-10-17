import {
  GetMembershipsResponse,
  GetUserResponse,
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
