import { getArticles } from '@/apis/article.api';
import { GetArticlesParams } from '@/types/dto/requests/article.request.types';
import { useQuery } from '@tanstack/react-query';

export const useBestArticlesQuery = (params: GetArticlesParams) => {
  return useQuery({
    queryKey: ['BestArticles'],
    queryFn: () => getArticles(params),
  });
};

export const useArticlesQuery = (params: GetArticlesParams) => {
  return useQuery({
    queryKey: ['Articles', params.page, params.pageSize, params.orderBy],
    queryFn: () => getArticles(params),
  });
};
