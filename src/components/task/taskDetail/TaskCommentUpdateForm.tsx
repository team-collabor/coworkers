/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Avatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button/ShadcnButton';
import { Divider } from '@/components/common/Divider';
import TextArea from '@/components/common/TextArea';
import { commentSchema } from '@/constants/formSchemas/commentSchema';
import { useToast } from '@/hooks/useToast';
import { useUpdateComment } from '@/queries/comments.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { useCommentStore } from '@/store/useCommentStore';
import { UpdateCommentRequest } from '@/types/dto/requests/comment.request.types';
import { cn } from '@/utils/tailwind/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type TaskCommentUpdateFormProps = {
  taskId: number;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

function TaskCommentUpdateForm({
  taskId,
  className,
}: TaskCommentUpdateFormProps) {
  const { user } = useAuthStore();
  const { selectedComment, setSelectedComment } = useCommentStore();
  const toast = useToast();
  const { register, handleSubmit, watch, reset } =
    useForm<UpdateCommentRequest>({
      mode: 'onBlur',
      resolver: zodResolver(commentSchema),
      defaultValues: {
        content: selectedComment?.content,
      },
    });
  const { mutate: updateComment } = useUpdateComment();

  const onSubmit = (data: UpdateCommentRequest) => {
    if (!selectedComment) {
      toast.toast({
        title: '댓글을 선택해주세요.',
      });
      return;
    }
    updateComment({
      taskId,
      commentId: selectedComment.id,
      content: data.content,
    });
    setSelectedComment(null);
  };

  const handleClickCancel = () => {
    reset();
    setSelectedComment(null);
  };

  useEffect(() => {
    reset({
      content: selectedComment?.content,
    });
  }, [selectedComment, reset]);

  return (
    <div
      className={cn('flex flex-col gap-3', className)}
      key={`${selectedComment?.id}-update-form`}
    >
      <div className="flex gap-4">
        <div className="pt-3">
          <Avatar src={user?.image || null} />
        </div>
        <form
          className="flex w-full flex-col gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextArea
            textAreaClassName={cn(
              'resize-none',
              'hover:border-brand-tertiary focus:border-brand-tertiary'
            )}
            placeholder="댓글을 입력해주세요."
            rows={2}
            defaultValue={selectedComment?.content}
            {...register('content')}
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClickCancel}
              className="hover:bg-transparent/20"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={!watch('content')}
              className={cn(
                'rounded-xl border-[1px] border-brand-tertiary p-3',
                'bg-transparent text-brand-tertiary',
                'hover:bg-brand-tertiary/15',
                'hover:border-brand-tertiary/80 active:border-brand-tertiary/60'
              )}
            >
              수정하기
            </Button>
          </div>
        </form>
      </div>
      <Divider className="border-icon-primary" />
    </div>
  );
}

export default TaskCommentUpdateForm;
