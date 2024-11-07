import { create } from 'zustand';

type BoardStore = {
  orderBy: string;
  searchValue: string;
  searchQuery: string;
  setOrderBy: (orderBy: string) => void;
  setSearchValue: (searchValue: string) => void;
  setSearchQuery: (searchQuery: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  orderBy: 'recent',
  searchValue: '',
  searchQuery: '',
  setOrderBy: (orderBy) => set({ orderBy }),
  setSearchValue: (searchValue) => set({ searchValue }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
