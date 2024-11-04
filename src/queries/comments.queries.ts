import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from '@/apis/comments.api';
import { useToast } from '@/hooks/useToast';
import { commentsQueryKeys } from '@/queries/keys/comments.keys';
import {
  AddCommentRequest,
  DeleteCommentRequest,
  GetCommentsRequest,
  UpdateCommentRequest,
} from '@/types/dto/requests/comment.request.types';
import {
  AddCommentResponse,
  DeleteCommentResponse,
  GetCommentsResponse,
  UpdateCommentResponse,
} from '@/types/dto/responses/comment.request.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksQueryKeys } from './keys/tasks.keys';

export const useGetComments = (params: GetCommentsRequest) => {
  return useQuery<GetCommentsResponse>({
    queryKey: commentsQueryKeys.comments(params.taskId),
    queryFn: () => getComments(params),
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AddCommentResponse, Error, AddCommentRequest>({
    mutationFn: (params: AddCommentRequest) => addComment(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.comments(params.taskId),
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: params.date,
        }),
      });
    },
    onError: (error) => {
      toast({
        title: '댓글 추가를 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<UpdateCommentResponse, Error, UpdateCommentRequest>({
    mutationFn: (params: UpdateCommentRequest) => updateComment(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.comments(params.taskId),
      });
      toast({
        title: '댓글을 수정했습니다.',
      });
    },
    onError: (error) => {
      toast({
        title: '댓글 수정을 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<DeleteCommentResponse, Error, DeleteCommentRequest>({
    mutationFn: (params: DeleteCommentRequest) => deleteComment(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.comments(params.taskId),
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKeys.tasks({
          groupId: params.groupId,
          taskListId: params.taskListId,
          date: params.date,
        }),
      });
      toast({
        title: '댓글을 삭제했습니다.',
      });
    },
    onError: (error) => {
      toast({
        title: '댓글 삭제를 실패했습니다.',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
