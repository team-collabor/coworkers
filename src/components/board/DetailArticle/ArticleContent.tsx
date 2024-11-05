/* eslint-disable @typescript-eslint/no-misused-promises */
import { useToast } from '@/hooks/useToast';
import {
  useDeleteArticleMutation,
  useGetArticleDetailQuery,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from '@/queries/article.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Dropdown from '@/components/common/Dropdown';
import { cn } from '@/utils/tailwind/cn';
import ArticleContentSkeleton from '../Skeleton/ArticleContentSkeleton';
import EditArticleForm from './EditArticleForm';

type ArticleContentProps = {
  boardId: number;
  isEditArticle: boolean;
  setIsEditArticle: (isEditArticle: boolean) => void;
};

function ArticleContent({
  boardId,
  isEditArticle,
  setIsEditArticle,
}: ArticleContentProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    data: article,
    isLoading,
    isError,
  } = useGetArticleDetailQuery(boardId);
  const { mutateAsync: likeArticle } = useLikeArticleMutation();
  const { mutateAsync: unlikeArticle } = useUnlikeArticleMutation();
  const { mutateAsync: deleteArticle } = useDeleteArticleMutation(boardId);

  const { toast } = useToast();

  const handleLikeClick = async () => {
    if (!user) {
      return;
    }
    if (article?.isLiked) {
      await unlikeArticle(boardId);
    } else {
      await likeArticle(boardId);
    }
  };

  const handleArticleEdit = () => {
    if (user?.id === article?.writer.id) {
      setIsEditArticle(true);
    } else {
      toast({
        title: '자신의 게시글만 수정할 수 있습니다.',
        variant: 'destructive',
      });
    }
  };

  const handleArticleDelete = async () => {
    if (user?.id === article?.writer.id) {
      await deleteArticle();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/boards');
    } else {
      toast({
        title: '자신의 게시글만 삭제할 수 있습니다.',
        variant: 'destructive',
      });
    }
  };

  if (isError) {
    toast({
      title: '게시글을 불러오는데 실패했습니다.',
      variant: 'destructive',
    });
  }

  if (isLoading || !article) {
    return <ArticleContentSkeleton />;
  }

  return (
    <div className="relative flex flex-col gap-6 rounded-2xl bg-secondary p-6">
      {!isEditArticle ? (
        <>
          <div className="flex justify-between gap-10">
            <h1
              className="w-full break-all text-2lg-medium leading-relaxed 
            text-secondary"
            >
              {article.title}
            </h1>
            <Dropdown
              dropdownStyle="absolute right-0"
              trigger={
                <Image
                  src="/icons/kebab_Small.svg"
                  alt="kebab"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              }
            >
              <button type="button" onClick={handleArticleEdit}>
                수정하기
              </button>
              <button type="button" onClick={handleArticleDelete}>
                삭제하기
              </button>
            </Dropdown>
          </div>
          <div className="h-[1px] w-full border-b border-primary" />
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <p className="text-md-medium text-primary">
                {article.writer.nickname}
              </p>
              <p className="text-md-medium text-slate-400">
                {formatDate(article.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/Comment.svg"
                  alt="commentIcon"
                  width={16}
                  height={16}
                />
                <p className="text-md-medium text-slate-400">
                  {article.commentCount}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleLikeClick}
                  className={cn('cursor-pointer', user || 'cursor-default')}
                >
                  <Image
                    src={
                      article?.isLiked
                        ? '/icons/Red_Heart.svg'
                        : '/icons/Heart.svg'
                    }
                    alt="heartIcon"
                    width={16}
                    height={16}
                  />
                </button>
                <p className="text-md-medium text-slate-400">
                  {article.likeCount}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div
              className="font-weight-400  break-all py-[10px] 
            text-base leading-relaxed text-secondary"
            >
              {article.content}
            </div>
            {article.image && (
              <Image
                src={article.image}
                alt="articleImage"
                width={100}
                height={100}
              />
            )}
          </div>
        </>
      ) : (
        <EditArticleForm
          setIsEditArticle={setIsEditArticle}
          article={article}
          boardId={boardId}
        />
      )}
    </div>
  );
}

export default ArticleContent;
