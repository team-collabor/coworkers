import { useGetUser } from '@/queries/users.queries';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useToast } from './useToast';

export const useRedirect = () => {
  const router = useRouter();
  const { data, isLoading } = useGetUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push('/signin');
      toast({
        title: '로그인 후 접근이 가능한 페이지입니다.',
      });
    }
  }, [data, isLoading, router, toast]);
};
