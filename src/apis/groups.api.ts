import { Team, TeamCreate } from '@/types/team';
import { axiosInstance } from './_axiosInstance';

interface UploadImageResponse {
  url: string;
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
