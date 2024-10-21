import { GetTaskRequest } from '@/types/dto/requests/tasks.request.types';

export const tasksQueryKeys = {
  tasks: (params: GetTaskRequest) => ['tasks', params],
};
