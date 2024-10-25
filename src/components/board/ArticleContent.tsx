/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  useGetArticleDetailQuery,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from '@/queries/article.queries';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';
import Image from 'next/image';

type ArticleContentProps = {
  boardId: number;
};

function ArticleContent({ boardId }: ArticleContentProps) {
  const { data, isLoading, isError } = useGetArticleDetailQuery(boardId);
  const { mutateAsync: likeArticle } = useLikeArticleMutation();
  const { mutateAsync: unlikeArticle } = useUnlikeArticleMutation();

  const handleLikeClick = async () => {
    if (data?.isLiked) {
      await unlikeArticle(boardId);
    } else {
      await likeArticle(boardId);
    }
  };

  // 추후에 수정 보완할 예정
  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) {
    return <div>error</div>;
  }
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="text-2lg-medium text-secondary">{data.title}</h1>
        <Image
          src="/icons/kebab_Small.svg"
          alt="kebab"
          width={24}
          height={24}
        />
      </div>
      <div className="h-[1px] w-full border-b border-primary" />
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <p className="text-md-medium text-primary">{data.writer.nickname}</p>
          <p className="text-md-medium text-slate-400">
            {formatDate(data.createdAt)}
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
            <p className="text-md-medium text-slate-400">{data.commentCount}</p>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={handleLikeClick}>
              <Image
                src={
                  data?.isLiked ? '/icons/Red_Heart.svg' : '/icons/Heart.svg'
                }
                alt="heartIcon"
                width={16}
                height={16}
              />
            </button>
            <p className="text-md-medium text-slate-400">{data.likeCount}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="font-weight-400  py-[10px] text-base text-secondary">
          {data.content}
        </div>
        {data.image && (
          <Image src={data.image} alt="image" width={100} height={100} />
        )}
      </div>
    </div>
  );
}

export default ArticleContent;
