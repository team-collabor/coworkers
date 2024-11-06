import { TaskList } from '@/types/tasklist.types';
import { Task } from '@/types/tasks.types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type TaskState = {
  selectedDate: Date;
  selectedTask: Task | null;
  selectedTaskList: TaskList | null;
  taskDetailModalOpen: boolean;
  isTaskUpdateFormShow: boolean;
  isTaskDeleteDialogOpen: boolean;
};

export type TaskActions = {
  setSelectedDate: (date: Date) => void;
  setSelectedTask: (task: Task) => void;
  setSelectedTaskList: (taskList: TaskList) => void;
  setTaskDetailModalOpen: (open: boolean) => void;
  setIsTaskUpdateFormShow: (show: boolean) => void;
  setIsTaskDeleteDialogOpen: (open: boolean) => void;
};

const initialState: TaskState = {
  selectedDate: new Date(),
  selectedTask: null,
  selectedTaskList: null,
  taskDetailModalOpen: false,
  isTaskUpdateFormShow: false,
  isTaskDeleteDialogOpen: false,
};

export const useTaskStore = create(
  immer(
    combine(initialState, (set) => ({
      setSelectedDate: (date: Date) => {
        set((state) => {
          state.selectedDate = date;
        });
      },
      setSelectedTask: (task: Task | null) => {
        set((state) => {
          state.selectedTask = task;
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
      setIsTaskUpdateFormShow: (show: boolean) => {
        set((state) => {
          state.isTaskUpdateFormShow = show;
        });
      },
      setIsTaskDeleteDialogOpen: (open: boolean) => {
        set((state) => {
          state.isTaskDeleteDialogOpen = open;
        });
      },
    }))
  )
);
