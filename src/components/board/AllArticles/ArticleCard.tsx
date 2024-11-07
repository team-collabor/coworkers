import { Article } from '@/types/article.types';
import { formatDate } from '@/utils/dateTimeUtils/FormatData';
import Image from 'next/image';
import Link from 'next/link';

type AllArticleCardProps = {
  article: Article;
};

function ArticleCard({ article }: AllArticleCardProps) {
  return (
    <Link
      href={`/boards/${article.id}`}
      className=" relative flex h-[176px] w-full flex-col justify-between 
      rounded-xl border border-solid border-tertiary bg-secondary
      px-8 py-6"
    >
      <div className="flex items-center justify-between">
        <div
          className="line-clamp-2 w-[15rem] self-start break-words 
          text-xl-medium leading-relaxed text-secondary"
        >
          {article.title}
        </div>

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div
            className="flex  items-center 
          justify-center"
          >
            <Image
              src="/icons/Member.svg"
              width={32}
              height={32}
              className="h-[2rem] w-[2rem]"
              alt="memberIcon"
            />
          </div>
          <div className="text-md-medium text-primary">
            {article.writer.nickname}
          </div>
          <div className="text-md-medium text-slate-400">
            {formatDate(article.createdAt)}
          </div>
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

export default ArticleCard;
