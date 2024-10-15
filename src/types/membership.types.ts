import { TGroup } from './group.types';
import { TUserRole } from './user.types';

export type TMembership = {
  role: TUserRole;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type TMemberships = Array<
  TMembership & {
    group: TGroup;
  }
>;
