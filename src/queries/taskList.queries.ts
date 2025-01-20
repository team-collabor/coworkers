import { deleteTaskList, postTaskList } from '@/apis/taskList.api';
import { useGlobalErrorHandler } from '@/hooks/useGlobalErrorHandler';
import { useToast } from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { groupsQueryKeys } from './keys/groups.key';

export const useTaskListMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handleError = useGlobalErrorHandler();
  return useMutation({
    mutationFn: (params: { groupId: number; name: string }) => {
      if (!params.name.trim()) {
        toast({
          title: '목록생성 실패',
          description: '할일 목록명을 작성해주세요.',
          variant: 'destructive',
        });
        return Promise.reject(new Error('할일 목록명을 작성해주세요.'));
      }
      return postTaskList(params.groupId, params.name);
    },
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(params.groupId),
      });
      toast({
        title: '목록생성 완료',
        description: '새 목록이 생성되었습니다',
      });
    },
    onError: (error) => handleError(error, '목록생성 실패'),
  });
};

export const useDeleteTaskList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const handleError = useGlobalErrorHandler();
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
    onError: (error) => handleError(error, '목록생성 실패.'),
  });
};
