import { Group } from './groups.types';

export type User = {
  id: number; // minimum: 1
  teamId: string;
  email: string;
  nickname: string; // minLength: 1, maxLength: 30
  image: string | null; // nullable: true
  updatedAt: string; // format: date-time
  createdAt: string; // format: date-time
};

export type Membership = {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: UserRole;
  group: Group;
};

export type UserRole = 'ADMIN' | 'MEMBER';
