import { TaskList, Team, TeamCreate } from '@/types/team';
import { axiosInstance } from './_axiosInstance';

interface UploadImageResponse {
  url: string;
}

export async function getTeams(id: number): Promise<Team> {
  const response = await axiosInstance.get<Team>(`groups/${id}`);
  return response.data;
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
    // eslint-disable-next-line no-console
    console.error('이미지 업로드 에러:', error);
    throw error;
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

export async function postTaskList(groupId: number, name: string) {
  const response = await axiosInstance.post<TaskList>(
    `/groups/${groupId}/task-lists`,
    { name },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const body = response.data;
  return body;
}

export async function getInviteGroup(id: number): Promise<string> {
  const response = await axiosInstance.get<string>(`groups/${id}/invitation`);
  return response.data;
}
