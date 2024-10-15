import { TBaseApiQuery, TResponse } from '@/types/base.types';
import { TMemberships } from '@/types/membership.types';
import { axiosInstance } from './_axiosInstance';
import { withExceptionHandler } from './_withExceptionHandler';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const _getMemberships = async ({
  path,
  config,
}: TBaseApiQuery): Promise<TResponse<TMemberships>> => {
  const response = await axiosInstance.get<TMemberships>(`/${path}s`, {
    ...config,
  });
  const { data } = response;
  return { data };
};

export const getGroups =
  withExceptionHandler<TResponse<TMemberships>>(_getMemberships);
