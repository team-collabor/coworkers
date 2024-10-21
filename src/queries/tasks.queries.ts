import { getTask, updateTaskStatus } from '@/apis/tasks.api';
import {
  GetTaskRequest,
  UpdateTaskStatusRequest,
} from '@/types/dto/requests/tasks.request.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksQueryKeys } from './keys/tasks.keys';

export const useTasks = (params: GetTaskRequest) => {
  return useQuery({
    queryKey: tasksQueryKeys.tasks(params),
    queryFn: () => getTask(params),
    enabled: !!params.date && !!params.groupId && !!params.taskListId,
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: UpdateTaskStatusRequest) =>
      updateTaskStatus(params),
    onSuccess: (_, params) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: params.date,
        } as GetTaskRequest),
      });
    },
  });
};
