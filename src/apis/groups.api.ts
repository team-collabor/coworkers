import {
  InviteGroupRequest,
  PostGroupRequest,
  UpdateGroupRequest,
} from '@/types/dto/requests/group.request.types';
import { GetGroupResponse } from '@/types/dto/responses/group.response.types';
import { TaskList } from '@/types/tasklist.types';
import { Task } from '@/types/tasks.types';
import { axiosInstance } from './_axiosInstance';

export const getGroup = async (id: number) => {
  try {
    const response = await axiosInstance<GetGroupResponse>({
      method: 'GET',
      url: `groups/${id}`,
    });
    return response.data;
  } catch (error) {
    throw new Error('팀 정보를 가져오는 데 실패했습니다.');
  }
};

export const postGroup = async ({ name, image }: PostGroupRequest) => {
  try {
    const response = await axiosInstance.post<GetGroupResponse>(
      'groups',
      { name, image },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const body = response.data;

    return body;
  } catch (error) {
    throw new Error('팀 생성하는 데 실패했습니다.');
  }
};

export const patchGroup = async ({ id, name, image }: UpdateGroupRequest) => {
  const response = await axiosInstance<GetGroupResponse>({
    method: 'PATCH',
    url: `groups/${id}`,
    data: { name, ...(image && { image }) },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteGroup = async (id: number) => {
  const response = await axiosInstance<string>({
    method: 'DELETE',
    url: `groups/${id}`,
  });
  return response.data;
};

export async function postInviteGroup({
  userEmail,
  token,
}: InviteGroupRequest) {
  try {
    const response = await axiosInstance.post<string>(
      'groups/accept-invitation',
      { userEmail, token },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const body = response.data;

    return body;
  } catch (error) {
    throw new Error('그룹 참여에 실패했습니다.');
  }
}

export const getInviteGroup = async (id: number) => {
  const response = await axiosInstance<string>({
    method: 'GET',
    url: `groups/${id}/invitation`,
  });
  return response.data;
};

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

export async function getTasks(id: number, date: string) {
  try {
    const response = await axiosInstance.get<Task[]>(`groups/${id}/tasks`, {
      params: { date },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = response.data;
    return body;
  } catch (error) {
    throw new Error('할 일을 불러오는 데 실패했습니다.');
  }
}
