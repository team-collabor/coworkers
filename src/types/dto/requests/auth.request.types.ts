export type SignUpRequest = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};
