export const articleQueryKeys = {
  allArticles: (orderBy?: string, searchValue?: string) => [
    'allArticles',
    orderBy,
    searchValue,
  ],
  bestArticles: () => ['BestArticles'],
  article: (articleId: number) => ['article', articleId],
  articleComments: (articleId: number) => ['articleComments', articleId],
};
