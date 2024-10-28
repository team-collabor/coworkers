import { Membership, User } from '@/types/users.types';

export type GetUserResponse = User & { memberships: Membership[] };

export type GetMembershipsResponse = Membership[];

export type SendResetPasswordEmailResponse = {
  message: string;
};

export type ResetPasswordResponse = {
  message: string;
};
