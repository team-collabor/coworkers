import { User } from '@/types/users.types';

export type SendResetPasswordEmailRequest = Pick<User, 'email'> & {
  redirectUrl: string;
};

export type ResetPasswordRequest = {
  password: string;
  passwordConfirmation: string;
  token: string;
};

export type UpdateUserImageRequest = { image: string };

export type UpdateUserImageUploadRequest = { image: File };

export type UpdateUserNicknameRequest = {
  nickname: string;
};

export type UpdateUserPasswordRequest = {
  passwordConfirmation: string;
  password: string;
};
