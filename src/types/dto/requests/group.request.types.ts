export type PostGroupRequest = {
  name: string;
  image: string;
};

export type UpdateGroupRequest = {
  id: number;
  name: string;
  image?: string;
};

export type InviteGroupRequest = {
  userEmail: string;
  token: string;
};
