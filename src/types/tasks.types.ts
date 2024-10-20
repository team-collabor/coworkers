import { User } from './users.types';

// FrequencyType 반복 주기 Enum 정의
export type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

export type FrequencyTypeKorean =
  | '매일 반복'
  | '매주 반복'
  | '매월 반복'
  | '반복 없음';

export type Task = {
  doneBy?: { user: Pick<User, 'image' | 'nickname' | 'id'> | null }; // nullable
  writer: Pick<User, 'image' | 'nickname' | 'id'>;
  displayIndex: number; // $double
  commentCount: number; // $double
  deletedAt?: string | null; // $date-time, nullable
  recurringId: number; // $double
  frequency: FrequencyType;
  updatedAt: string; // $date-time
  doneAt?: string | null; // $date-time, nullable
  date: string; // $date-time
  description?: string | null; // nullable
  name: string;
  id: number; // $double
};
