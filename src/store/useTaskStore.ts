import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type TaskState = {
  selectedDate: Date;
};

export type TaskActions = {
  setSelectedDate: (date: Date) => void;
};

const initialState: TaskState = {
  selectedDate: new Date(),
};

export const useTaskStore = create(
  persist(
    immer(
      combine(initialState, (set) => ({
        setSelectedDate: (date: Date) => {
          set((state) => {
            state.selectedDate = date;
          });
        },
      }))
    ),
    {
      name: 'taskStore',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
