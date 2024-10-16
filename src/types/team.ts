// 팀 생성
export type TeamCreate = {
  name: string;
  image: string;
};

export type Team = TeamCreate & {
  teamId: string;
  updatedAt: string; // ISO 날짜 형식의 문자열
  createdAt: string; // ISO 날짜 형식의 문자열
  id: number;
  members: Member[];
  taskLists: TaskList[];
};

export type Member = {
  role: 'ADMIN' | 'MEMBER'; // 역할은 고정된 문자열로 제한
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type TaskList = {
  displayIndex: number;
  groupId: number;
  updatedAt: string; // ISO 날짜 형식의 문자열
  createdAt: string; // ISO 날짜 형식의 문자열
  name: string;
  id: number;
  tasks: string[]; // 문자열 배열
};
