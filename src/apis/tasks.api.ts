import { GetTaskRequest } from '@/types/dto/requests/tasks.request.types';
import { GetTaskResponse } from '@/types/dto/responses/tasks.response.types';
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
