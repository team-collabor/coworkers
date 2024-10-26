import {
  addTask,
  deleteTask,
  getTask,
  updateTaskStatus,
} from '@/apis/tasks.api';
import { useToast } from '@/hooks/useToast';
import {
  AddTaskRequest,
  DeleteTaskRequest,
  GetTaskRequest,
  UpdateTaskStatusRequest,
} from '@/types/dto/requests/tasks.request.types';
import { FrequencyType } from '@/types/tasks.types';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';
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
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: formatDate(params.startDate),
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
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (params: UpdateTaskStatusRequest) =>
      updateTaskStatus(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: formatDate(params.date ?? ''),
        }),
      });
    },
    onError: (error) => {
      toast({
        title: '할 일 상태 수정을 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (params: DeleteTaskRequest) => deleteTask(params),
    onSuccess: (_, params) => {
      toast({
        title: '할 일을 삭제했습니다.',
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: formatDate(params.date ?? ''),
        }),
      });
    },
    onError: (error) => {
      toast({
        title: '할 일 삭제를 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
