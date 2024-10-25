export const articleQueryKeys = {
  allArticles: (orderBy?: string, searchValue?: string) => [
    'allArticles',
    orderBy,
    searchValue,
  ],
  bestArticles: () => ['bestArticles'],
  article: (articleId: number) => ['article', articleId],
  articleComments: (articleId?: number, limit?: number) => [
    'articleComments',
    articleId,
    limit,
  ],
};
