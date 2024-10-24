import { Article, ArticleDetail, Writer } from '@/types/article.types';

export type ArticleListResponse = {
  totalCount: number;
  list: Article[];
};

export type PostArticleResponse = Article;

export type ArticleDetailResponse = ArticleDetail;

export type PostArticleCommentResponse = {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

export type ListItem = {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

export type ArticleCommentListResponse = {
  nextCursor: number;
  list: ListItem[];
};
