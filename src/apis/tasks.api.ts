/* eslint-disable max-len */
import {
  AddTaskRequest,
  DeleteTaskRequest,
  GetTaskDetailRequest,
  GetTaskRequest,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
} from '@/types/dto/requests/tasks.request.types';
import {
  AddTaskResponse,
  GetTaskDetailResponse,
  GetTaskResponse,
  UpdateTaskResponse,
  UpdateTaskStatusResponse,
} from '@/types/dto/responses/tasks.response.types';
import _ from 'lodash';
import { axiosInstance } from './_axiosInstance';

export const getTask = async (params: GetTaskRequest) => {
  const response = await axiosInstance<GetTaskResponse>({
    method: 'GET',
    url: `/groups/${params.groupId}/task-lists/${params.taskListId}/tasks`,
    params: {
      date: params.date,
    },
  });
  return response.data;
};

export const getTaskDetail = async (params: GetTaskDetailRequest) => {
  const response = await axiosInstance<GetTaskDetailResponse>({
    method: 'GET',
    url: `/groups/${params.groupId}/task-lists/${params.taskListId}/tasks/${params.taskId}`,
  });
  return response.data;
};

export const addTask = async (params: AddTaskRequest) => {
  // eslint-disable-next-line max-len
  const path = `/groups/${params.groupId}/task-lists/${params.taskListId}/recurring`;
  const requestBody = _.omit(params, ['groupId', 'taskListId']);
  const response = await axiosInstance<AddTaskResponse>({
    method: 'POST',
    url: path,
    data: requestBody,
  });
  return response.data;
};

export const updateTaskStatus = async (params: UpdateTaskStatusRequest) => {
  const response = await axiosInstance<UpdateTaskStatusResponse>({
    method: 'PATCH',
    url: `/groups/${params.groupId}
		/task-lists/${params.taskListId}/tasks/${params.taskId}`,
    data: {
      done: params.done,
    },
  });
  return response.data;
};

export const updateTask = async (params: UpdateTaskRequest) => {
  const response = await axiosInstance<UpdateTaskResponse>({
    method: 'PATCH',
    url: `/groups/${params.groupId}/task-lists/${params.taskListId}/tasks/${params.taskId}`,
    data: {
      name: params.name,
      description: params.description,
    },
  });
  return response.data;
};

export const deleteTask = async (params: DeleteTaskRequest) => {
  await axiosInstance({
    method: 'DELETE',
    url: `/groups/${params.groupId}/task-lists/${params.taskListId}/tasks/${params.taskId}`,
  });
};
