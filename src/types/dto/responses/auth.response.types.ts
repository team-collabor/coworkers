export type SignUpResponse = {
  user: {
    id: number;
    nickname: string;
    createdAt: string;
    updatedAt: string;
    image: string | null;
    teamId: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type SignInResponse = {
  user: {
    id: number;
    nickname: string;
    createdAt: string;
    updatedAt: string;
    image: string | null;
    teamId: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
};
