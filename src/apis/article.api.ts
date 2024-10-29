import {
  GetArticleCommentsParams,
  GetArticlesParams,
  PostArticleCommentParams,
  PostArticleParams,
  UpdateArticleParams,
} from '@/types/dto/requests/article.request.types';
import {
  ArticleCommentListResponse,
  ArticleDetailResponse,
  ArticleListResponse,
  PostArticleCommentResponse,
  PostArticleResponse,
} from '@/types/dto/responses/article.response.types';
import { axiosInstance } from './_axiosInstance';

// article

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

export const getArticleDetail = async (articleId: number) => {
  const response = await axiosInstance<ArticleDetailResponse>({
    method: 'GET',
    url: `/articles/${articleId}`,
  });
  return response.data;
};

export const likeArticle = async (articleId: number) => {
  await axiosInstance({
    method: 'POST',
    url: `/articles/${articleId}/like`,
  });
};
export const unlikeArticle = async (articleId: number) => {
  await axiosInstance({
    method: 'DELETE',
    url: `/articles/${articleId}/like`,
  });
};

export const updateArticle = async (
  articleId: number,
  data: UpdateArticleParams
) => {
  await axiosInstance({
    method: 'PATCH',
    url: `/articles/${articleId}`,
    data,
  });
};

export const deleteArticle = async (articleId: number) => {
  await axiosInstance({
    method: 'DELETE',
    url: `/articles/${articleId}`,
  });
};

// article comment

export const postArticleComment = async (data: PostArticleCommentParams) => {
  const response = await axiosInstance<PostArticleCommentResponse>({
    method: 'POST',
    url: `/articles/${data.articleId}/comments`,
    data: {
      content: data.content,
    },
  });
  return response.data;
};

export const getArticleComments = async ({
  limit,
  cursor,
  articleId,
}: GetArticleCommentsParams) => {
  const response = await axiosInstance<ArticleCommentListResponse>({
    method: 'GET',
    url: `/articles/${articleId}/comments`,
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
};

export const deleteArticleComment = async (commentId: number) => {
  await axiosInstance({
    method: 'DELETE',
    url: `/comments/${commentId}`,
  });
};

export const updateArticleComment = async (
  commentId: number,
  content: string
) => {
  await axiosInstance({
    method: 'PATCH',
    url: `/comments/${commentId}`,
    data: {
      content,
    },
  });
};
