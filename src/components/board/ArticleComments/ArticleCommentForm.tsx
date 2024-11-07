import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { usePostArticleCommentMutation } from '@/queries/article.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { useBoardStore } from '@/store/useBoardStore';
import React, { useState } from 'react';

type ArticleCommentFormProps = {
  boardId: number;
};

function ArticleCommentForm({ boardId }: ArticleCommentFormProps) {
  const [comment, setComment] = useState<string>('');
  const { searchQuery, orderBy } = useBoardStore();
  const { mutateAsync: postArticleComment } = usePostArticleCommentMutation(
    searchQuery,
    orderBy
  );
  const { user } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() === '') {
      toast({
        title: '댓글을 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }
    await postArticleComment({
      articleId: boardId,
      content: comment,
    });
    setComment('');
  };

  if (!user) {
    return (
      <div
        className="h-[10rem] resize-none rounded-xl border border-primary
    bg-secondary px-6 py-4 outline-none"
      >
        로그인 후 이용해주세요.
      </div>
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <textarea
        placeholder="댓글을 입력해주세요."
        value={comment}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setComment(e.target.value)
        }
        className="h-[10rem] resize-none rounded-xl border border-primary
        bg-secondary px-6 py-4 outline-none"
      />
      <Button
        type="submit"
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.White}
        buttonBackgroundColor={ButtonBackgroundColor.Green}
        textSize={TextSize.Large}
        buttonBorderColor={ButtonBorderColor.None}
        buttonPadding={ButtonPadding.Large}
        className="w-44 self-end mob:w-20"
      >
        등록
      </Button>
    </form>
  );
}

export default ArticleCommentForm;
