import { TaskList } from '@/types/tasklist.types';
import { axiosInstance } from './_axiosInstance';

export const postTaskList = async (groupId: number, name: string) => {
  const response = await axiosInstance<TaskList>({
    method: 'POST',
    url: `/groups/${groupId}/task-lists`,
    data: { name },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteTaskList = async (groupId: number, taskListId: number) => {
  const response = await axiosInstance({
    method: 'DELETE',
    url: `/groups/${groupId}/task-lists/${taskListId}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
