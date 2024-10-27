import { FrequencyType, Task } from '@/types/tasks.types';

export type GetTaskResponse = Task[];

export type GetTaskDetailResponse = Task;

export type UpdateTaskStatusResponse = Task;

export type UpdateTaskResponse = Task;

export type AddTaskResponse = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  frequencyType: FrequencyType;
  weekDays?: number[];
  monthDay?: number;
  createdAt: string;
  updatedAt: string;
};
