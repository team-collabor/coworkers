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
  const response = await axiosInstance<GetGroupResponse>({
    method: 'GET',
    url: `groups/${id}`,
  });
  return response.data;
};

export const postGroup = async ({ name, image }: PostGroupRequest) => {
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
}

export const getInviteGroup = async (id: number) => {
  const response = await axiosInstance<string>({
    method: 'GET',
    url: `groups/${id}/invitation`,
  });
  return response.data;
};

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

export async function getTasks(id: number, date: string) {
  const response = await axiosInstance<Task[]>({
    method: 'GET',
    url: `groups/${id}/tasks`,
    data: { date },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function deleteMember(groupId: number, memberUserId: number) {
  await axiosInstance({
    method: 'DELETE',
    url: `groups/${groupId}/member/${memberUserId}`,
  });
}
