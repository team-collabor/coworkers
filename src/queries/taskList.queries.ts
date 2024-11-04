import { deleteTaskList, postTaskList } from '@/apis/taskList.api';
import { useToast } from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupsQueryKeys } from './keys/groups.key';

export const useTaskListMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { groupId: number; name: string }) =>
      postTaskList(params.groupId, params.name),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(params.groupId),
      });
      toast({
        title: '목록생성 완료',
        description: '새 목록이 생성되었습니다',
      });
    },
    onError: (err) => {
      toast({
        title: '목록생성 실패',
        description: err.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteTaskList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { groupId: number; taskListId: number }) =>
      deleteTaskList(params.groupId, params.taskListId),
    onSuccess: (_, params) => {
      toast({
        title: '목록삭제 완료',
        description: '해당 목록을 삭제하였습니다.',
      });
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(params.groupId),
      });
    },
    onError: (err) => {
      toast({
        title: '목록삭제 실패',
        description: err.message,
        variant: 'destructive',
      });
    },
  });
};
