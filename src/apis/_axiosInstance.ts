import { useAuthStore } from '@/store/useAuthStore';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from './auth.api';

const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${TEAM_ID}`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      const modifiedConfig = { ...config };
      modifiedConfig.headers.Authorization = `Bearer ${accessToken}`;
      return modifiedConfig;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig;
    if (error.response.status === 401 && !(originalRequest as any)._retry) {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        try {
          // refreshToken 으로 새로운 accessToken 발급
          const { data } = await refreshAccessToken(refreshToken);
          // Store에 새로운 accessToken 저장
          useAuthStore.getState().setAccessToken(data.accessToken);
          // 새로운 accessToken으로 재요청
          (originalRequest as any)._retry = true;
          if (originalRequest.headers) {
            // eslint-disable-next-line max-len
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          }
          return await axiosInstance(originalRequest);
        } catch (refreshError) {
          useAuthStore.getState().clearAuth();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);
