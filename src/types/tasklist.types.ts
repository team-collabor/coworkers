import { Task } from './tasks.types';

export type TaskList = {
  displayIndex: number;
  groupId: number;
  updatedAt: string; // ISO 날짜 형식의 문자열
  createdAt: string; // ISO 날짜 형식의 문자열
  name: string;
  id: number;
  tasks: Task[]; // 문자열 배열
};
