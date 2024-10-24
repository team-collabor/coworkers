import { FrequencyType, Task } from '@/types/tasks.types';

export type GetTaskResponse = Task[];

export type UpdateTaskStatusResponse = Task;

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
