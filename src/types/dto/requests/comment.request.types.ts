import { Comment } from '@/types/comment.types';

export type AddCommentRequest = {
  taskId: number;
  content: Comment['content'];
};

export type UpdateCommentRequest = {
  taskId: number;
  content: Comment['content'];
};

export type DeleteCommentRequest = {
  taskId: number;
  commentId: number;
};

export type GetCommentsRequest = {
  taskId: number;
};
