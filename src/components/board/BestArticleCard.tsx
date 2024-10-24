import { Article } from '@/types/article.types';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';
import Image from 'next/image';

type BestArticleCardProps = {
  article: Article;
  className?: string;
};

function BestArticleCard({ article, className }: BestArticleCardProps) {
  return (
    <article
      className={`relative flex h-[220px] w-full flex-col justify-between
                  rounded-xl border border-solid border-tertiary bg-secondary
                  px-6 pb-4 pt-12
                  ${className}`}
    >
      <div className="absolute left-3 top-3 flex items-start gap-1">
        <div>
          <Image src="/icons/best.svg" width={16} height={16} alt="bestIcon" />
        </div>
        <span className="text-lg-semibold text-white">Best</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-2">
          <div className="flex-1 overflow-hidden">
            <p
              className="line-clamp-2 break-words text-xl-medium leading-relaxed
            text-secondary"
            >
              {article.title}
            </p>
          </div>
          <div className="h-[4.5rem] w-[4.5rem] flex-shrink-0">
            {article.image ? (
              <Image
                src={article.image}
                width={72}
                height={72}
                alt="articleImage"
                className="object-cover"
              />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="text-md-medium text-slate-400">
          {formatDate(article.createdAt)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/member.svg"
            width={32}
            height={32}
            alt="memberIcon"
          />
          <span className="text-md-medium text-primary">
            {article.writer.nickname}
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
    </article>
  );
}

export default BestArticleCard;
