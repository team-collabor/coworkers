import { axiosInstance } from '@/apis/_axiosInstance';
import { TGroups } from '../model/types';

export const getGroups = async (id: string | number, signal: AbortSignal) => {
  const response = await axiosInstance.get<TGroups>(`/groups/${id}`, {
    headers: { 'Content-Length': 'application/json' },
    signal,
  });
  const { data } = response;
  return data;
};
