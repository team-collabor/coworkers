import { getMemberships, getUser } from '@/apis/user.api';
import { FetchQueryOptions } from '@tanstack/react-query';

export const ROOT_USER = 'user';
export const ROOT_MEMBERSHIP = 'membership';

export const getUserQuery = <T>({
  prefetch,
}: {
  prefetch: boolean;
}): FetchQueryOptions<T> => ({
  queryKey: [ROOT_USER],
  queryFn: async ({ signal }) => {
    const data = await getUser({
      path: `/${ROOT_USER}`,
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

export const getMembershipsQuery = <T>(): FetchQueryOptions<T> => ({
  queryKey: [`${ROOT_MEMBERSHIP}s`],
  queryFn: async ({ signal }): Promise<T> => {
    const data = await getMemberships({
      path: `/${ROOT_USER}/${ROOT_MEMBERSHIP}s`,
      config: {
        signal,
      },
    });
    return data as T;
  },
});
