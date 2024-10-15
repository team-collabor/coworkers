import { TBaseApiQuery, TResponse } from '@/types/base.types';
import axios from 'axios';

const createErrorResponse = (
  status: string,
  message: string
): Promise<TResponse<null>> => {
  return Promise.resolve({
    error: {
      status,
      message,
    },
  });
};

export const withExceptionHandler = <R>(
  callback: (...args: any[]) => Promise<R>
) => {
  return async (params: TBaseApiQuery): Promise<R> => {
    try {
      const data = await callback(params);
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return createErrorResponse(e.code || '500', e.message) as R;
      }
      if (e instanceof Error) {
        return createErrorResponse(e.name, e.message) as R;
      }
      return createErrorResponse('500', '알 수 없는 에러 발생.') as R;
    }
  };
};
