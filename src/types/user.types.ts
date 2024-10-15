import { TBaseDate } from './base.types';

export type TUserRole = 'ADMIN' | 'MEMBER';

export type TUser = TBaseDate & {
  teamId: string;
  image: string;
  nickname: string;
  email: string;
  id: number;
};
