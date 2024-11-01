import { TTaskDone } from '@/types/temp.types';
import { Membership, User } from '@/types/users.types';

export type GetUserResponse = User & { memberships: Membership[] };

export type GetMembershipsResponse = Membership[];

export type SendResetPasswordEmailResponse = {
  message: string;
};

export type ResetPasswordResponse = {
  message: string;
};

export type GetHistoryResponse = {
  tasksDone: TTaskDone[];
};

export type UpdateUserImageResponse = { url: string };

export type UpdateUserNicknameResponse = { message: string };

export type UpdateUserPasswordResponse = { message: string };
