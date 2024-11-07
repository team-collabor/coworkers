import {
  addTask,
  deleteTask,
  getTask,
  getTaskDetail,
  updateTask,
  updateTaskStatus,
} from '@/apis/tasks.api';
import { useToast } from '@/hooks/useToast';
import {
  AddTaskRequest,
  DeleteTaskRequest,
  GetTaskDetailRequest,
  GetTaskRequest,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
} from '@/types/dto/requests/tasks.request.types';
import { FrequencyType, Task } from '@/types/tasks.types';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groupsQueryKeys, groupTasksQueryKeys } from './keys/groups.key';
import { tasksQueryKeys } from './keys/tasks.keys';

export const useTasks = (params: GetTaskRequest) => {
  return useQuery({
    queryKey: tasksQueryKeys.tasks(params),
    queryFn: () => getTask(params),
    enabled: !!params.date && !!params.groupId && !!params.taskListId,
  });
};

export const useTaskDetail = (params: GetTaskDetailRequest) => {
  return useQuery({
    queryKey: tasksQueryKeys.taskDetail(params),
    queryFn: () => getTaskDetail(params),
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
    onSuccess: (res, params) => {
      toast({
        title: '할 일을 추가했습니다.',
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks(),
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.taskDetail({
          groupId: params.groupId,
          taskListId: params.taskListId,
          taskId: res.id,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(params.groupId),
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

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (params: UpdateTaskRequest) => updateTask(params),
    onSuccess: (_, params) => {
      toast({
        title: '할 일을 수정했습니다.',
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: formatDate(params.date ?? ''),
        }),
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.taskDetail({
          groupId: params.groupId,
          taskListId: params.taskListId,
          taskId: params.taskId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(params.groupId),
      });
    },
    onError: (error) => {
      toast({
        title: '할 일 수정을 실패했습니다.',
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
    onMutate: async (params) => {
      await queryClient.cancelQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: formatDate(params.startDate ?? ''),
        }),
      });

      const previousTasks = queryClient.getQueryData<Task[]>(
        tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: formatDate(params.startDate ?? ''),
        })
      );

      queryClient.setQueryData(
        tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: formatDate(params.startDate ?? ''),
        }),
        (old: Task[]) => {
          return old.map((task: Task) =>
            task.id === params.taskId ? { ...task, doneAt: params.done } : task
          );
        }
      );

      return { previousTasks };
    },
    onError: (error, params, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          tasksQueryKeys.tasks({
            groupId: params.groupId,
            taskListId: params.taskListId,
            date: formatDate(params.startDate ?? ''),
          }),
          context.previousTasks
        );
      }
      toast({
        title: '할 일 상태 수정을 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSettled: (_, error, params) => {
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: formatDate(params.startDate ?? ''),
        }),
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.taskDetail({
          groupId: params.groupId,
          taskListId: params.taskListId,
          taskId: params.taskId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(params.groupId),
      });
      queryClient.invalidateQueries({
        queryKey: groupTasksQueryKeys.Groups(params.groupId),
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
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(params.groupId),
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
