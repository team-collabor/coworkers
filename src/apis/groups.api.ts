import { Task, TaskList, Team, TeamCreate, TeamUpdate } from '@/types/team';
import { axiosInstance } from './_axiosInstance';

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

export async function postTeam({ name, image }: TeamCreate) {
  try {
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
  } catch (error) {
    throw new Error('팀 생성하는 데 실패했습니다.');
  }
}

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

export async function postInviteGroup(userEmail: string, token: string) {
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

export async function getTasks(id: number, date: string): Promise<Task[]> {
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
