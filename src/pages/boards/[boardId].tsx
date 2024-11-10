/* eslint-disable max-len */
import ArticleCommentForm from '@/components/board/ArticleComments/ArticleCommentForm';
import ArticleCommentList from '@/components/board/ArticleComments/ArticleCommentList';
import ArticleContent from '@/components/board/DetailArticle/ArticleContent';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

function ArticleDetail() {
  const [isEditArticle, setIsEditArticle] = useState(false);

  const router = useRouter();
  const { boardId } = router.query;

  return (
    <>
      <Head>
        <title>{Number(boardId)}번 게시물 - Coworkers</title>
        <meta
          name="description"
          content="자유롭게 의견을 나누고 소통할 수 있는 Coworkers 게시물입니다."
        />
        <meta property="og:title" content="게시물 - Coworkers" />
        <meta
          property="og:description"
          content="Coworkers 게시물에서 팀원들과 자유롭게 의견을 나누세요."
        />
        <meta
          property="og:url"
          content={`https://coworkers-colla.netlify.app/boards/${Number(boardId)}`}
        />
      </Head>
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
    </>
  );
}

export default ArticleDetail;
