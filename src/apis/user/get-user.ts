/* eslint-disable @typescript-eslint/naming-convention */

import { TBaseQuery } from '@/types/base';
import { TResponse } from '@/types/common';
import { TGroup } from '@/types/group';
import { TMembership, TUser } from '@/types/user';
import { axiosInstance } from '../_axiosInstance';
import { withExceptionHandler } from '../_withExceptionHandler';

export type TGetPrefetchedUserData =
  | (TUser & {
      memberships: Array<
        TMembership & {
          group: TGroup;
        }
      >;
    })
  | null;

const _getUser = async ({
  path,
  config,
}: TBaseQuery): Promise<TResponse<TGetPrefetchedUserData>> => {
  const response = await axiosInstance.get<TGetPrefetchedUserData>(
    path,
    config
  );
  const { data } = response;
  return { data };
};

export const getUser = withExceptionHandler<
  TBaseQuery,
  TResponse<TGetPrefetchedUserData>
>(_getUser);
