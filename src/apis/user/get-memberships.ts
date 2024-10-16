/* eslint-disable @typescript-eslint/naming-convention */
import { TBaseQuery } from '@/types/base';
import { TResponse } from '@/types/common';
import { TMemberships } from '@/types/user/user.memberships';
import { axiosInstance } from '../_axiosInstance';
import { withExceptionHandler } from '../_withExceptionHandler';

const _getMemberships = async ({
  path,
  config,
}: TBaseQuery): Promise<TResponse<TMemberships>> => {
  const response = await axiosInstance.get<TMemberships>(path, config);
  const { data } = response;
  return { data };
};

export const getMemberships = withExceptionHandler<
  TBaseQuery,
  TResponse<TMemberships>
>(_getMemberships);
