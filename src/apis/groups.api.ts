import { TaskList, Team, TeamCreate } from '@/types/team';
import { axiosInstance } from './_axiosInstance';

interface UploadImageResponse {
  url: string;
}

export async function getTeams(id: number): Promise<Team> {
  try {
    const response = await axiosInstance.get<Team>(`groups/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('팀 정보를 가져오는 데 실패했습니다.');
  }
}

export async function postImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await axiosInstance.post<UploadImageResponse>(
      'images/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data.url;
  } catch (error) {
    throw new Error('이미지를 업로드하는 데 실패했습니다.');
  }
}

export async function postTeam({ name, image }: TeamCreate) {
  const response = await axiosInstance.post<Team>(
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
}

export async function postInviteGroup(userEmail: string, token: string) {
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

export async function postTaskList(
  groupId: number,
  name: string
): Promise<TaskList> {
  try {
    const response = await axiosInstance.post<TaskList>(
      `/groups/${groupId}/task-lists`,
      { name },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('태스크 리스트를 생성하는 데 실패했습니다.');
  }
}

export async function getInviteGroup(id: number): Promise<string> {
  const response = await axiosInstance.get<string>(`groups/${id}/invitation`);
  return response.data;
}
