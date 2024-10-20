import { getTask } from '@/apis/tasks.api';
import { GetTaskRequest } from '@/types/dto/requests/tasks.request.types';
import { useQuery } from '@tanstack/react-query';
import { tasksQueryKeys } from './keys/tasks.keys';

export const useTasks = (params: GetTaskRequest) => {
  const { ...returns } = useQuery({
    queryKey: tasksQueryKeys.tasks(params),
    queryFn: () => getTask(params),
    enabled: !!params.date && !!params.groupId && !!params.taskListId,
  });

  return { ...returns };
};
