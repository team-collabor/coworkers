/* eslint-disable @typescript-eslint/naming-convention */
import { TBaseApiQuery, TResponse } from '@/types/base.types';
import { TGroup } from '@/types/group.types';
import { TMembership, TMemberships } from '@/types/membership.types';
import { TUser } from '@/types/user.types';
import { axiosInstance } from './_axiosInstance';
import { withExceptionHandler } from './_withExceptionHandler';

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
}: TBaseApiQuery): Promise<TResponse<TGetPrefetchedUserData>> => {
  const response = await axiosInstance.get<TGetPrefetchedUserData>(
    path,
    config
  );
  const { data } = response;
  return { data };
};

export const getUser =
  withExceptionHandler<TResponse<TGetPrefetchedUserData>>(_getUser);

const _getMemberships = async ({
  path,
  config,
}: TBaseApiQuery): Promise<TResponse<TMemberships>> => {
  const response = await axiosInstance.get<TMemberships>(path, config);
  const { data } = response;
  return { data };
};

export const getMemberships =
  withExceptionHandler<TResponse<TMemberships>>(_getMemberships);
