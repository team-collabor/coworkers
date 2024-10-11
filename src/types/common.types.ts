import { ReactNode } from 'react';

export type CommonTypes = {
  children: ReactNode;
  label: string;
  errorMessage: string;
  updatedAt: Date;
  createdAt: Date;
  title: string;
  id: number;
  name: string;
  nickname: string;
  email: string;
  image: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  e: React.MouseEvent<HTMLElement, MouseEvent>;
};
