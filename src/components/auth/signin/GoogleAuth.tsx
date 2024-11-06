/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import axios from 'axios';
import { useEffect, useRef } from 'react';

import { axiosInstance } from '@/apis/_axiosInstance';
import { useToast } from '@/hooks/useToast';
import { useAuthStore } from '@/store/useAuthStore';

function GoogleAuth() {
  const { toast } = useToast();
  const { setUser, setAccessToken, setRefreshToken } = useAuthStore();
  const isProcessing = useRef(false);

  useEffect(() => {
    const GoogleLogin = async () => {
      if (typeof window === 'undefined' || isProcessing.current) return;

      isProcessing.current = true;

      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      console.log('GoogleAuth: ', code);
      console.log('GoogleAuth: ', state);

      if (!code || !state) {
        isProcessing.current = false;
        return;
      }

      try {
        const tokenResponse = await axios.post(
          'https://oauth2.googleapis.com/token',
          {
            code,
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code',
          }
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const GoogleToken = tokenResponse.data.id_token;

        const response = await axiosInstance.post('/auth/signIn/GOOGLE', {
          state,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          token: GoogleToken,
          redirectUri: process.env.NEXT_PUBLIC_RESET_PASSWORD_REDIRECT_URL,
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = response;

        if (response.status === 200) {
          toast({
            title: '로그인 성공',
            variant: 'default',
          });
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);
          setUser({
            id: data.user.id,
            nickname: data.user.nickname,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
            image: data.user.image,
            teamId: data.user.teamId,
            email: data.user.email,
          });

          window.location.replace('/');
        } else {
          toast({
            title: '로그인 요청 중 오류가 발생했습니다.',
            variant: 'destructive',
          });
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            title: err.response.data.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: '로그인 요청 중 오류가 발생했습니다.',
            variant: 'destructive',
          });
        }
      } finally {
        isProcessing.current = false;
      }
    };

    GoogleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default GoogleAuth;
