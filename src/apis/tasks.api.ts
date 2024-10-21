import {
  GetTaskRequest,
  UpdateTaskStatusRequest,
} from '@/types/dto/requests/tasks.request.types';
import {
  GetTaskResponse,
  UpdateTaskStatusResponse,
} from '@/types/dto/responses/tasks.response.types';
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
