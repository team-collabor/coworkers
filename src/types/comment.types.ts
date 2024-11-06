import { User } from './users.types';

export type Comment = {
  user: Pick<User, 'image' | 'nickname' | 'id'>;
  updatedAt: string; // string($date-time)
  createdAt: string; // string($date-time)
  content: string; // 최대 길이: 200
  id: number; // IdIdinteger($int32), minimum: 1
};
