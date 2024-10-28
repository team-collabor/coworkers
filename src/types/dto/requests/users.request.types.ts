import { User } from '@/types/users.types';

export type SendResetPasswordEmailRequest = Pick<User, 'email'> & {
  redirectUrl: string;
};

export type ResetPasswordRequest = {
  password: string;
  passwordConfirmation: string;
  token: string;
};
