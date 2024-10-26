import { TaskList } from '@/types/tasklist.types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type TaskState = {
  selectedDate: Date;
  selectedTaskList: TaskList | null;
  taskDetailModalOpen: boolean;
};

export type TaskActions = {
  setSelectedDate: (date: Date) => void;
  setSelectedTaskList: (taskList: TaskList) => void;
  setTaskDetailModalOpen: (open: boolean) => void;
};

const initialState: TaskState = {
  selectedDate: new Date(),
  selectedTaskList: null,
  taskDetailModalOpen: false,
};

export const useTaskStore = create(
  immer(
    combine(initialState, (set) => ({
      setSelectedDate: (date: Date) => {
        set((state) => {
          state.selectedDate = date;
        });
      },
      setSelectedTaskList: (taskList: TaskList) => {
        set((state) => {
          state.selectedTaskList = taskList;
        });
      },
      setTaskDetailModalOpen: (open: boolean) => {
        set((state) => {
          state.taskDetailModalOpen = open;
        });
      },
    }))
  )
);
