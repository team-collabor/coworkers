import { GetArticlesParams } from '@/types/dto/requests/article.request.types';
// eslint-disable-next-line max-len
import { ArticleListResponse } from '@/types/dto/responses/article.response.types';
import { axiosInstance } from './_axiosInstance';

export const getArticles = async ({
  page,
  pageSize,
  orderBy,
  keyword,
}: GetArticlesParams) => {
  const response = await axiosInstance<ArticleListResponse>({
    method: 'GET',
    url: '/articles',
    params: {
      page,
      pageSize,
      orderBy,
      keyword,
    },
  });
  return response.data;
};
