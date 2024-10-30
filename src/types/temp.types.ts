export type TFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

export type TTask = {
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number;
  frequency: TFrequency;
  updatedAt: string;
  doneAt: string;
  date: string;
  description: string;
  name: string;
  id: number;
};

export type TTaskReferences = {
  userId: number;
  writerId: number;
};

export type TTaskDone = TTask & TTaskReferences;
