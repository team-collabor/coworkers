import { deleteTaskList, postTaskList } from '@/apis/taskList.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupsQueryKeys } from './keys/groups.key';

export const useTaskListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { groupId: number; name: string }) =>
      postTaskList(params.groupId, params.name),
    onSuccess: (_, params) => {
      queryClient
        .invalidateQueries({ queryKey: groupsQueryKeys.groups(params.groupId) })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.error('팀 다시 불러오기 오류');
        });
    },
  });
};

export const useDeleteTaskList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { groupId: number; taskListId: number }) =>
      deleteTaskList(params.groupId, params.taskListId),
    onSuccess: (_, params) => {
      queryClient
        .invalidateQueries({ queryKey: groupsQueryKeys.groups(params.groupId) })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.error('팀 다시 불러오기 오류');
        });
    },
  });
};
