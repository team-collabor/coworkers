import { getUser } from '@/apis/user.api';
import { FetchQueryOptions } from '@tanstack/react-query';

export const ROOT_USER = 'user';

export const getUserQuery = <T>({
  prefetch,
}: {
  prefetch: boolean;
}): FetchQueryOptions<T> => ({
  queryKey: [ROOT_USER],
  queryFn: async ({ signal }) => {
    const data = await getUser({
      path: ROOT_USER,
      config: {
        signal,
      },
    });
    if (!prefetch) {
      if (data.data) {
        const { memberships, ...rest } = data.data;
        return Promise.resolve({ data: rest }) as T;
      }
    }
    return data as T;
  },
});
