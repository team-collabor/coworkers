import { TaskList } from '@/types/tasklist.types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type TaskState = {
  selectedDate: Date;
  selectedTaskList: TaskList | null;
};

export type TaskActions = {
  setSelectedDate: (date: Date) => void;
  setSelectedTaskList: (taskList: TaskList) => void;
};

const initialState: TaskState = {
  selectedDate: new Date(),
  selectedTaskList: null,
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
    }))
  )
);
