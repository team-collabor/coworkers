import { TaskList } from '@/types/tasklist.types';

export type Member = {
  role: 'ADMIN' | 'MEMBER'; // 역할은 고정된 문자열로 제한
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type GetGroupResponse = {
  teamId: string;
  name: string;
  image: string;
  updatedAt: string; // ISO 날짜 형식의 문자열
  createdAt: string; // ISO 날짜 형식의 문자열
  id: number;
  members: Member[];
  taskLists: TaskList[];
};
