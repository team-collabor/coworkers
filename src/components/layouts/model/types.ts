export type TGroups = Array<{
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members?: TMembers;
  taskLists?: TTaskLists;
}>;

export type TMember = {
  role: 'ADMIN';
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type TMembers = Array<TMember>;

export type TTaskList = {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: string[];
};

export type TTaskLists = Array<TTaskList>;
