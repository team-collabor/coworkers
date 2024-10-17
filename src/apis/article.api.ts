import {
  GetArticlesParams,
  PostArticleParams,
} from '@/types/dto/requests/article.request.types';
import {
  ArticleListResponse,
  PostArticleResponse,
} from '@/types/dto/responses/article.response.types';
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

export const postArticle = async (data: PostArticleParams) => {
  const response = await axiosInstance<PostArticleResponse>({
    method: 'POST',
    url: '/articles',
    data,
  });
  return response.data;
};
