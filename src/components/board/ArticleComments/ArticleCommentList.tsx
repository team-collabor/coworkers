import { useGetArticleCommentsQuery } from '@/queries/article.queries';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ArticleComment from './ArticleComment';

type ArticleCommentListProps = {
  boardId: number;
};

function ArticleCommentList({ boardId }: ArticleCommentListProps) {
  const LIMIT = 5;

  const { data, fetchNextPage, hasNextPage } = useGetArticleCommentsQuery(
    boardId,
    LIMIT
  );

  const comments = data?.pages.flatMap((page) => page.list) ?? [];

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="flex flex-col gap-4">
      {comments.length !== 0 ? (
        comments.map((comment, index) => (
          <div
            ref={index === comments.length - 1 ? ref : null}
            key={comment.id}
          >
            <ArticleComment
              comment={comment}
              isEditing={comment.id === editingCommentId}
              setEditingCommentId={setEditingCommentId}
              articleId={boardId}
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center text-lg-medium text-default">
          아직 작성된 댓글이 없습니다.
        </div>
      )}
    </div>
  );
}

export default ArticleCommentList;
