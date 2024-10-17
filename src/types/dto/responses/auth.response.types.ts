import { User } from '@/types/users.types';

export type SignUpResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type SignInResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};
