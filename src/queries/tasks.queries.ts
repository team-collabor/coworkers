import { addTask, getTask, updateTaskStatus } from '@/apis/tasks.api';
import { useToast } from '@/hooks/useToast';
import {
  AddTaskRequest,
  GetTaskRequest,
  UpdateTaskStatusRequest,
} from '@/types/dto/requests/tasks.request.types';
import { FrequencyType } from '@/types/tasks.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksQueryKeys } from './keys/tasks.keys';

export const useTasks = (params: GetTaskRequest) => {
  return useQuery({
    queryKey: tasksQueryKeys.tasks(params),
    queryFn: () => getTask(params),
    enabled: !!params.date && !!params.groupId && !!params.taskListId,
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    onMutate: (params) => {
      if (params.frequencyType === FrequencyType.Weekly) {
        const { monthDay, ...rest } = params;
        return rest;
      }
      if (params.frequencyType === FrequencyType.Monthly) {
        const { weekDays, ...rest } = params;
        return rest;
      }
      const { weekDays, monthDay, ...rest } = params;
      return rest;
    },
    mutationFn: async (params: AddTaskRequest) => addTask(params),
    onSuccess: (_, params) => {
      toast({
        title: '할 일을 추가했습니다.',
      });
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
        }),
      });
    },
    onError: (error) => {
      toast({
        title: '할 일 추가를 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
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
