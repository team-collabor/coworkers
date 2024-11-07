import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button/ShadcnButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog';
import { Divider } from '@/components/common/Divider';
import { useDeleteComment, useGetComments } from '@/queries/comments.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { useCommentStore } from '@/store/useCommentStore';
import { useTaskStore } from '@/store/useTaskStore';
import { Comment } from '@/types/comment.types';
import formatDistanceToNowKor from '@/utils/dateTimeUtils/FormatDistanceToNow';
import { cn } from '@/utils/tailwind/cn';
import { MoreVerticalIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import TaskCommentDropDown from './TaskCommentDropDown';
import TaskCommentUpdateForm from './TaskCommentUpdateForm';

type TaskCommentListProps = {
  taskId: number;
};

export default function TaskCommentList({
  taskId,
  ...props
}: TaskCommentListProps) {
  const { data: comments } = useGetComments({ taskId });
  const { user } = useAuthStore();
  const { mutate: deleteComment } = useDeleteComment();
  const { selectedDate, selectedTaskList } = useTaskStore();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCommentIdToDelete, setSelectedCommentIdToDelete] = useState<
    number | null
  >(null);
  const { selectedComment, setSelectedComment } = useCommentStore();

  const sortedComments = comments?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleClickDropdownDelete = (commentId: number) => {
    setIsDeleteDialogOpen(true);
    setSelectedCommentIdToDelete(commentId);
  };

  const handleClickDropdownUpdate = (comment: Comment) => {
    setSelectedComment(comment);
  };

  const handleClickDeleteConfirm = (commentId: number) => {
    deleteComment({
      commentId,
      taskId,
      date: selectedDate.toISOString(),
      groupId: selectedTaskList?.groupId ?? -1,
      taskListId: selectedTaskList?.id ?? -1,
    });
    setIsDeleteDialogOpen(false);
    setSelectedCommentIdToDelete(null);
  };

  return (
    <div
      className={cn('flex w-full flex-col gap-4', 'overflow-hidden')}
      {...props}
    >
      {sortedComments?.map((comment: Comment) => (
        <Fragment key={`${comment.id}-comment`}>
          <div
            className={cn('flex flex-col gap-4', {
              hidden: selectedComment?.id === comment.id,
            })}
          >
            <div
              className={cn(
                'flex items-center justify-between',
                comment.user.id === user?.id && 'text-gray-900'
              )}
            >
              <div
                className={cn(
                  'mr-12 mt-2 flex',
                  'max-w-[43rem] flex-nowrap items-center gap-2',
                  'break-keep text-md-regular text-primary',
                  'whitespace-normal break-words'
                )}
              >
                {comment.content.toString()}
              </div>
              <div className="flex">
                {comment.user.id === user?.id && (
                  <TaskCommentDropDown
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          'h-6 w-6 rounded-full bg-transparent',
                          'hover:bg-transparent/20 active:bg-transparent/10'
                        )}
                      >
                        <MoreVerticalIcon
                          className={cn('h-4 w-4 text-icon-primary')}
                        />
                      </Button>
                    }
                    dropdownStyle="-translate-x-20 w-28"
                  >
                    <button
                      type="button"
                      className="h-[36px] text-md-regular text-primary"
                      onClick={() => handleClickDropdownUpdate(comment)}
                    >
                      수정하기
                    </button>
                    <button
                      type="button"
                      className="h-[36px] text-md-regular text-status-danger"
                      onClick={() => handleClickDropdownDelete(comment.id)}
                    >
                      삭제하기
                    </button>
                  </TaskCommentDropDown>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Avatar
                src={comment.user.image}
                userNickname={comment.user.nickname}
              />
              <div
                className={cn(
                  'flex items-center gap-3 text-xs-regular text-primary'
                )}
              >
                {formatDistanceToNowKor(comment.updatedAt)}
              </div>
            </div>
            <Divider
              key={`${comment.id}-divider`}
              className="border-icon-primary"
            />
          </div>
          <TaskCommentUpdateForm
            key={`${comment.id}-update-form`}
            taskId={taskId}
            className={cn('hidden', {
              flex: selectedComment?.id === comment.id,
            })}
          />
        </Fragment>
      ))}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>댓글을 삭제하시겠습니까?</DialogTitle>
            <DialogDescription>
              삭제된 댓글은 복구할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                handleClickDeleteConfirm(selectedCommentIdToDelete ?? -1)
              }
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
