// 팀 생성
export interface TeamCreate {
  name: string;
  image: string;
}
export interface Team extends TeamCreate {
  teamId: string;
  updatedAt: string; // ISO 날짜 형식의 문자열
  createdAt: string; // ISO 날짜 형식의 문자열
  id: number;
  members: Member[]; // Member 타입 정의 필요
  taskLists: TaskList[]; // TaskList 타입 정의 필요
}

export interface Member {
  role: 'ADMIN' | 'MEMBER'; // 역할은 고정된 문자열로 제한
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export interface TaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string; // ISO 날짜 형식의 문자열
  createdAt: string; // ISO 날짜 형식의 문자열
  name: string;
  id: number;
  tasks: string[]; // 문자열 배열
}
