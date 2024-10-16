import { useBestArticlesQuery } from '@/queries/article.queries';
import clsx from 'clsx';
import BestArticleCard from './BestArticleCard';

function BestArticlesSection() {
  const { data: bestArticles } = useBestArticlesQuery({
    page: 1,
    pageSize: 3,
    orderBy: 'recent',
  });

  return (
    <div
      className="border-primary-10 mb-10 mt-10 flex
      w-full flex-col gap-14 border-b border-solid border-primary pb-14"
    >
      <h1 className="self-start text-xl-bold">베스트 게시글</h1>
      <div className="flex w-full items-start justify-between gap-3">
        {bestArticles?.list.map((article, index) => (
          <BestArticleCard
            key={article.id}
            article={article}
            className={clsx({
              'hidden tab:block mob:hidden pc:block': index === 1,
              'hidden pc:block': index === 2,
            })}
          />
        ))}
      </div>
    </div>
  );
}

export default BestArticlesSection;
