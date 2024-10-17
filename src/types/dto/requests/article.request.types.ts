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
