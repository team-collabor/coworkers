import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRedirect = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }
  }, [user, router]);
};
