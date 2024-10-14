export type TGroup = {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  members?: TMembers;
  taskLists?: TTaskLists;
};

export type TGroups = Array<TGroup>;

export type TMember = {
  role: 'ADMIN' | 'MEMBER';
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type TMembers = Array<TMember>;

export type TTaskList = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: string[];
};

export type TTaskLists = Array<TTaskList>;
