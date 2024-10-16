/* eslint-disable @typescript-eslint/naming-convention */
import { TBaseQuery } from '@/types/base';
import { TResponse } from '@/types/common';
import { TGroups } from '@/types/group';
import { axiosInstance } from '../_axiosInstance';
import { withExceptionHandler } from '../_withExceptionHandler';

export const _getGroups = async ({
  path,
  config,
}: TBaseQuery): Promise<TResponse<TGroups>> => {
  const response = await axiosInstance.get<TGroups>(path, config);
  const { data } = response;
  return { data };
};

export const getGroups = withExceptionHandler<TBaseQuery, TResponse<TGroups>>(
  _getGroups
);
