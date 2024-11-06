import { Comment } from '@/types/comment.types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type CommentState = {
  selectedComment: Comment | null;
};

export type CommentActions = {
  setSelectedComment: (comment: Comment | null) => void;
};

const initialState: CommentState = {
  selectedComment: null,
};

export const useCommentStore = create(
  immer(
    combine(initialState, (set) => ({
      setSelectedComment: (comment: Comment | null) => {
        set((state) => {
          state.selectedComment = comment;
        });
      },
    }))
  )
);
