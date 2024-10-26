import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button/ShadcnButton';
import { Divider } from '@/components/common/Divider';
import { useGetComments } from '@/queries/comments.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { Comment } from '@/types/comment.types';
import formatDistanceToNowKor from '@/utils/dateTimeUtils/FormatDistanceToNow';
import { cn } from '@/utils/tailwind/cn';
import { MoreVerticalIcon } from 'lucide-react';
import { forwardRef } from 'react';

type TaskCommentListProps = {
  taskId: number;
};

const TaskCommentList = forwardRef<HTMLDivElement, TaskCommentListProps>(
  ({ taskId, ...props }, ref) => {
    const { data: comments } = useGetComments({ taskId });
    const { user } = useAuthStore();

    const sortedComments = comments?.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full flex-col gap-4',
          'w-[43rem] overflow-hidden'
        )}
        {...props}
      >
        {sortedComments?.map((comment: Comment) => (
          <div key={comment.id} className="flex flex-col gap-2">
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
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'h-6 w-6 rounded-full bg-transparent',
                    'hover:bg-transparent/20 active:bg-transparent/10'
                  )}
                >
                  <MoreVerticalIcon className="h-4 w-4 text-icon-primary" />
                </Button>
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
                {comment.updatedAt.length > 0 && (
                  <>
                    <span>(수정됨)</span>
                    {formatDistanceToNowKor(comment.updatedAt)}
                  </>
                )}
              </div>
            </div>
            <Divider
              key={`${comment.id}-divider`}
              className="border-icon-primary"
            />
          </div>
        ))}
      </div>
    );
  }
);

export default TaskCommentList;
