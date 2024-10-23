import { FrequencyType } from '@/types/tasks.types';

export type GetTaskRequest = {
  groupId: number;
  taskListId: number;
  date?: string; // 날짜는 선택적이며, ISO 8601 형식의 문자열
};

export type UpdateTaskStatusRequest = {
  groupId: number;
  taskListId: number;
  taskId: number;
  done: boolean;
  date?: string;
};

export type AddTaskRequest = {
  name: string;
  description: string;
  groupId: number;
  taskListId: number;
  startDate: string;
  frequencyType: FrequencyType;
  weekDays?: number[];
  monthDay?: number;
};
