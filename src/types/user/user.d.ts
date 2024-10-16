import { TBaseDate } from '../base/base.date';

export type TUser = TBaseDate & {
  teamId: string;
  image: string;
  nickname: string;
  email: string;
  id: number;
};
