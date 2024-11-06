import { Comment } from '@/types/comment.types';

export type AddCommentRequest = {
  taskId: number;
  content: Comment['content'];
  date: string;
  groupId: number;
  taskListId: number;
};

export type UpdateCommentRequest = {
  taskId: number;
  commentId: number;
  content: Comment['content'];
};

export type DeleteCommentRequest = {
  taskId: number;
  commentId: number;
  date: string;
  groupId: number;
  taskListId: number;
};

export type GetCommentsRequest = {
  taskId: number;
};
