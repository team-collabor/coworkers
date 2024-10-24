/* eslint-disable @typescript-eslint/no-misused-promises */
import { useToast } from '@/hooks/useToast';
import {
  useDeleteArticleCommentMutation,
  useUpdateArticleCommentMutation,
} from '@/queries/article.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { ListItem } from '@/types/dto/responses/article.response.types';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';
import Image from 'next/image';
import { useState } from 'react';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '../common/Button/Button';
import Dropdown from '../common/Dropdown';

type ArticleCommentProps = {
  comment: ListItem;
  isEditing: boolean;
  setEditingCommentId: (id: number | null) => void;
};

function ArticleComment({
  comment,
  isEditing,
  setEditingCommentId,
}: ArticleCommentProps) {
  const userId = useAuthStore((state) => state.user?.id);
  const { toast } = useToast();
  const [editedContent, setEditedContent] = useState<string>(comment.content);
  const { mutateAsync: deleteArticleComment } =
    useDeleteArticleCommentMutation();
  const { mutateAsync: updateArticleComment } =
    useUpdateArticleCommentMutation();

  const handleCommentEdit = () => {
    setEditingCommentId(comment.id);
  };

  const handleCommentDelete = async () => {
    await deleteArticleComment(comment.id);
  };

  const handleCommentSave = async () => {
    if (editedContent.trim() === '') {
      toast({
        title: '댓글을 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }
    await updateArticleComment({
      commentId: comment.id,
      content: editedContent,
    });
    setEditingCommentId(null);
  };

  const handleCommentCancel = () => {
    setEditingCommentId(null);
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg bg-secondary px-6 py-5">
      <div className="flex items-start justify-between">
        <p className="w-[600px] whitespace-pre-wrap break-words">
          {isEditing ? (
            <textarea
              className="h-40 w-full resize-none rounded-xl bg-primary 
            px-4 py-2 outline-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            comment.content
          )}
        </p>
        {userId === comment.writer.id &&
          (isEditing ? (
            <div className="flex gap-2">
              <Button
                type="button"
                buttonStyle={ButtonStyle.Box}
                textColor={TextColor.White}
                textSize={TextSize.Medium}
                buttonWidth={ButtonWidth.Fit}
                buttonBackgroundColor={ButtonBackgroundColor.None}
                buttonBorderColor={ButtonBorderColor.LightGray}
                buttonPadding={ButtonPadding.Small}
                onClick={handleCommentSave}
              >
                저장
              </Button>
              <Button
                type="button"
                buttonStyle={ButtonStyle.Box}
                textColor={TextColor.White}
                textSize={TextSize.Medium}
                buttonWidth={ButtonWidth.Fit}
                buttonBackgroundColor={ButtonBackgroundColor.None}
                buttonBorderColor={ButtonBorderColor.LightGray}
                buttonPadding={ButtonPadding.Small}
                onClick={handleCommentCancel}
              >
                취소
              </Button>
            </div>
          ) : (
            <Dropdown
              trigger={
                <Image
                  src="/icons/kebab_Small.svg"
                  alt="kebab"
                  width={24}
                  height={24}
                />
              }
            >
              <button type="button" onClick={handleCommentEdit}>
                수정하기
              </button>
              <button type="button" onClick={handleCommentDelete}>
                삭제하기
              </button>
            </Dropdown>
          ))}
      </div>
      <div className="flex items-center gap-6 ">
        <div className="flex items-center gap-2">
          <Image
            src={comment.writer.image ?? '/icons/Member.svg'}
            alt="writerImage"
            width={32}
            height={32}
          />
          <p>{comment.writer.nickname}</p>
        </div>
        <div className="h-[1rem] w-[0.125rem] bg-slate-700" />

        <div>
          <p>{formatDate(comment.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default ArticleComment;
