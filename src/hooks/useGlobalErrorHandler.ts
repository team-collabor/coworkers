import { useToast } from '@/hooks/useToast';
import axios, { AxiosError } from 'axios';

export const useGlobalErrorHandler = () => {
  const { toast } = useToast();

  return (error: AxiosError | Error, title: string) => {
    let errorMessage = '알 수 없는 에러가 발생했습니다.';

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message as string;
    } else {
      errorMessage = error.message;
    }
    toast({
      title,
      description: errorMessage,
      variant: 'destructive',
    });
  };
};
