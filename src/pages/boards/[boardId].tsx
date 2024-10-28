import ArticleCommentForm from '@/components/board/ArticleCommentForm';
import ArticleCommentList from '@/components/board/ArticleCommentList';
import ArticleContent from '@/components/board/ArticleContent';
import { useRouter } from 'next/router';

function ArticleDetail() {
  const router = useRouter();
  const { boardId } = router.query;

  return (
    <div className="mt-20 flex w-full flex-col gap-10">
      <ArticleContent boardId={Number(boardId)} />
      <ArticleCommentForm boardId={Number(boardId)} />
      <div className="h-[1px] w-full border-b border-primary" />
      <ArticleCommentList boardId={Number(boardId)} />
    </div>
  );
}

export default ArticleDetail;