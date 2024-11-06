import { Article } from '@/types/article.types';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';
import Image from 'next/image';
import Link from 'next/link';

type BestArticleCardProps = {
  article: Article;
  className?: string;
};

function BestArticleCard({ article, className }: BestArticleCardProps) {
  return (
    <Link
      href={`/boards/${article.id}`}
      className={`relative flex h-[220px] w-full flex-col 
                  rounded-xl border border-solid border-tertiary
                  bg-secondary px-6 pb-4 pt-12
                  ${className}`}
    >
      <div className="absolute left-3 top-3 flex items-start gap-1">
        <div>
          <Image src="icons/Best.svg" width={16} height={16} alt="bestIcon" />
        </div>
        <span className="text-lg-semibold text-white">Best</span>
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div
            className="line-clamp-2 w-[15rem] self-start break-words 
          text-xl-medium leading-relaxed text-secondary"
          >
            {article.title}
          </div>
          <div className="h-[4.5rem] w-[4.5rem] flex-shrink-0">
            {article.image && (
              <Image
                src={article.image}
                width={72}
                height={72}
                alt="articleImage"
                className="h-[4.5rem] w-[4.5rem] object-contain"
              />
            )}
          </div>
        </div>
        <div className="text-md-medium text-slate-400">
          {formatDate(article.createdAt)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-[32px] w-[32px] items-center 
            justify-center"
          >
            <Image src="/icons/Member.svg" fill alt="memberIcon" />
          </div>
          <span className="text-md-medium text-primary">
            {article.writer.nickname}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1">
            <div>
              <Image
                src="/icons/Comment.svg"
                width={16}
                height={16}
                alt="commentIcon"
              />
            </div>
            <span className="text-md-regular text-slate-400">
              {article.commentCount}
            </span>
          </div>
          <div className="flex gap-1">
            <div>
              <Image
                src="/icons/Heart.svg"
                width={16}
                height={16}
                alt="likeIcon"
              />
            </div>
            <span className="text-md-regular text-slate-400">
              {article.likeCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BestArticleCard;
