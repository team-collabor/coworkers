/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button/ShadcnButton';
import TextArea from '@/components/common/TextArea';
import { commentSchema } from '@/constants/formSchemas/commentSchema';
import { useAddComment } from '@/queries/comments.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/utils/tailwind/cn';
import { ArrowUpIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function TaskCommentForm({ taskId }: { taskId: number }) {
  const { user } = useAuthStore();
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      content: '',
    },
  });
  const { mutate: addComment } = useAddComment();

  const onSubmit = (comment: z.infer<typeof commentSchema>) => {
    addComment({
      taskId,
      content: comment.content,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
      reset();
    }
  };

  return (
    <div className="flex gap-4">
      <div className="pt-3">
        <Avatar src={user?.image || null} />
      </div>
      <form
        className="flex w-full gap-6"
        onSubmit={handleSubmit(onSubmit)}
        onKeyPress={handleKeyPress}
      >
        <TextArea
          textAreaClassName={cn(
            'resize-none',
            'hover:border-brand-tertiary focus:border-brand-tertiary'
          )}
          placeholder="댓글을 입력해주세요."
          rows={2}
          {...register('content')}
        />
        <div className="pt-3">
          <Button
            variant="default"
            size="icon"
            disabled={!watch('content')}
            className={cn(
              'mt-2 size-8 rounded-full bg-brand-tertiary',
              'hover:bg-brand-tertiary/80 active:bg-brand-tertiary/60'
            )}
          >
            <ArrowUpIcon className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TaskCommentForm;
