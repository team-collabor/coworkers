import { TaskList, Team, TeamCreate, TeamUpdate } from '@/types/team';
import { axiosInstance } from './_axiosInstance';

interface UploadImageResponse {
  url: string;
}

export const getTeams = async (id: number): Promise<Team> => {
  try {
    const response = await axiosInstance<Team>({
      method: 'GET',
      url: `groups/${id}`,
    });
    return response.data;
  } catch (error) {
    throw new Error('팀 정보를 가져오는 데 실패했습니다.');
  }
};

export const postImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axiosInstance<UploadImageResponse>({
      method: 'POST',
      url: 'images/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url;
  } catch (error) {
    throw new Error('이미지를 업로드하는 데 실패했습니다.');
  }
};

export const postTeam = async ({ name, image }: TeamCreate): Promise<Team> => {
  const response = await axiosInstance<Team>({
    method: 'POST',
    url: 'groups',
    data: { name, image },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const patchTeam = async (
  id: number,
  { name, image }: TeamUpdate
): Promise<Team> => {
  const response = await axiosInstance<Team>({
    method: 'PATCH',
    url: `groups/${id}`,
    data: { name, ...(image && { image }) },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteTeam = async (id: number): Promise<string> => {
  const response = await axiosInstance<string>({
    method: 'DELETE',
    url: `groups/${id}`,
  });
  return response.data;
};

export const postInviteGroup = async (
  userEmail: string,
  token: string
): Promise<string> => {
  const response = await axiosInstance<string>({
    method: 'POST',
    url: 'groups/accept-invitation',
    data: { userEmail, token },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const postTaskList = async (
  groupId: number,
  name: string
): Promise<TaskList> => {
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
    throw new Error('태스크 리스트를 생성하는 데 실패했습니다.');
  }
};

export const getInviteGroup = async (id: number): Promise<string> => {
  const response = await axiosInstance<string>({
    method: 'GET',
    url: `groups/${id}/invitation`,
  });
  return response.data;
};
