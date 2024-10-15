import { getArticles } from '@/apis/article.api';
import { GetArticlesParams } from '@/types/dto/requests/article.request.types';
// eslint-disable-next-line max-len
import { ArticleListResponse } from '@/types/dto/responses/article.response.types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useBestArticlesQuery = (params: GetArticlesParams) => {
  return useQuery({
    queryKey: ['BestArticles'],
    queryFn: () => getArticles(params),
  });
};

export const useAllArticlesQuery = (
  orderBy: string,
  searchValue: string,
  pageSize: number
) => {
  return useInfiniteQuery<ArticleListResponse>({
    queryKey: ['allArticles', orderBy, searchValue],
    queryFn: ({ pageParam = 1 }) =>
      getArticles({
        page: pageParam as number,
        pageSize,
        orderBy,
        keyword: searchValue,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalCount ? allPages.length + 1 : undefined,
  });
};
