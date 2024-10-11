import { Team } from '@/types/team';
import { axiosInstance } from './_axiosInstance';

export default async function postTeam({ name, imageUrl }: Team) {
  const response = await axiosInstance.post<Team>(
    'groups',
    { name, imageUrl },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const body = response.data;

  return body;
}
