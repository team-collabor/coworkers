import { useAuthStore } from '@/store/useAuthStore';
import axios, { InternalAxiosRequestConfig } from 'axios';

const TEAM_ID = '8-4';
const BASE_URL = `https://fe-project-cowokers.vercel.app/${TEAM_ID}`;

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
