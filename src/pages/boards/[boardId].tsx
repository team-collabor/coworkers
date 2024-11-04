/* eslint-disable max-len */
import ArticleCommentForm from '@/components/board/ArticleComments/ArticleCommentForm';
import ArticleCommentList from '@/components/board/ArticleComments/ArticleCommentList';
import ArticleContent from '@/components/board/DetailArticle/ArticleContent';
import { useRouter } from 'next/router';
import { useState } from 'react';

function ArticleDetail() {
  const [isEditArticle, setIsEditArticle] = useState(false);

  const router = useRouter();
  const { boardId } = router.query;

  return (
    <div className="my-20 flex w-full flex-col gap-10 mob:my-10">
      <ArticleContent
        boardId={Number(boardId)}
        isEditArticle={isEditArticle}
        setIsEditArticle={setIsEditArticle}
      />
      {!isEditArticle && (
        <>
          <ArticleCommentForm boardId={Number(boardId)} />
          <div className="h-[1px] w-full border-b border-primary" />
          <ArticleCommentList boardId={Number(boardId)} />
        </>
      )}
    </div>
  );
}

export default ArticleDetail;
