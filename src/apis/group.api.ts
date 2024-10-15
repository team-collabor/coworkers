import { TBaseApiQuery, TResponse } from '@/types/base.types';
import { TGroups } from '@/types/group.types';
import { axiosInstance } from './_axiosInstance';
import { withExceptionHandler } from './_withExceptionHandler';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const _getGroups = async ({
  path,
  config,
}: TBaseApiQuery): Promise<TResponse<TGroups>> => {
  const response = await axiosInstance.get<TGroups>(`/${path}s`, {
    ...config,
  });
  const { data } = response;
  return { data };
};

export const getGroups = withExceptionHandler<TResponse<TGroups>>(_getGroups);
