export type GetArticlesParams = {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
};

export type PostArticleParams = {
  title: string;
  content: string;
  image?: string;
};

export type ArticleDetailParams = {
  articleId: number;
};

export type PostArticleCommentParams = {
  articleId: number;
  content: string;
};

export type GetArticleCommentsParams = {
  limit: number;
  cursor: number;
  articleId: number;
};
