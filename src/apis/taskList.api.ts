import { TaskList } from '@/types/tasklist.types';
import { axiosInstance } from './_axiosInstance';

export const postTaskList = async (groupId: number, name: string) => {
  try {
    const response = await axiosInstance<TaskList>({
      method: 'POST',
      url: `/groups/${groupId}/task-lists`,
      data: { name },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('할 일 목록를 생성하는 데 실패했습니다.');
  }
};

export const deleteTaskList = async (groupId: number, taskListId: number) => {
  try {
    const response = await axiosInstance({
      method: 'DELETE',
      url: `/groups/${groupId}/task-lists/${taskListId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw new Error('');
  }
};
