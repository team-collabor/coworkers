/* eslint-disable max-len */
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
import { axiosInstance } from './_axiosInstance';

export const getComments = async (params: GetCommentsRequest) => {
  const response = await axiosInstance<GetCommentsResponse>({
    method: 'GET',
    url: `/tasks/${params.taskId}/comments`,
  });
  return response.data;
};

export const addComment = async (params: AddCommentRequest) => {
  const response = await axiosInstance<AddCommentResponse>({
    method: 'POST',
    url: `/tasks/${params.taskId}/comments`,
    data: {
      content: params.content,
    },
  });
  return response.data;
};

export const updateComment = async (params: UpdateCommentRequest) => {
  const response = await axiosInstance<UpdateCommentResponse>({
    method: 'PATCH',
    url: `/tasks/${params.taskId}/comments/${params.commentId}`,
    data: {
      content: params.content,
    },
  });
  return response.data;
};

export const deleteComment = async (params: DeleteCommentRequest) => {
  const response = await axiosInstance<DeleteCommentResponse>({
    method: 'DELETE',
    url: `/tasks/${params.taskId}/comments/${params.commentId}`,
  });
  return response.data;
};
