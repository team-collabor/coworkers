import { Membership, User } from '@/types/users.types';

export type GetUserResponse = User & { memberships: Membership[] };

export type GetMembershipsResponse = Membership[];
