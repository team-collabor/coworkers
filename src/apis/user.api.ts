import { TBaseApiQuery, TResponse } from '@/types/base.types';
import { TGroup } from '@/types/group.types';
import { TMembership } from '@/types/membership.types';
import { TUser } from '@/types/user.types';
import axios from 'axios';
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

// eslint-disable-next-line @typescript-eslint/naming-convention
const _getUser = async ({
  path,
  config,
}: TBaseApiQuery): Promise<TResponse<TGetPrefetchedUserData>> => {
  const response = await axios.get<TGetPrefetchedUserData>(
    `http://localhost:3000/api/${path}`,
    {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const { data } = response;
  return { data };
};

export const getUser =
  withExceptionHandler<TResponse<TGetPrefetchedUserData>>(_getUser);
