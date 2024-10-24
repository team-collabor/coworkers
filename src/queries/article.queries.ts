import {
  deleteArticleComment,
  getArticleComments,
  getArticleDetail,
  getArticles,
  likeArticle,
  postArticle,
  postArticleComment,
  unlikeArticle,
  updateArticleComment,
} from '@/apis/article.api';
import {
  GetArticlesParams,
  PostArticleCommentParams,
  PostArticleParams,
} from '@/types/dto/requests/article.request.types';
// eslint-disable-next-line max-len
import {
  ArticleCommentListResponse,
  ArticleListResponse,
} from '@/types/dto/responses/article.response.types';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

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

export const usePostArticleMutation = () => {
  return useMutation({
    mutationFn: (article: PostArticleParams) => postArticle(article),
  });
};

export const useGetArticleDetailQuery = (articleId: number) => {
  return useQuery({
    queryKey: ['articleDetail', articleId],
    queryFn: () => getArticleDetail(articleId),
    enabled: !Number.isNaN(articleId),
  });
};

export const useLikeArticleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (articleId: number) => likeArticle(articleId),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['articleDetail'] });
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
    },
  });
};

export const useUnlikeArticleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (articleId: number) => unlikeArticle(articleId),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['articleDetail'] });
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
    },
  });
};

export const usePostArticleCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostArticleCommentParams) => postArticleComment(data),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['articleComments'] });
    },
  });
};

export const useGetArticleCommentsQuery = (
  articleId: number,
  limit: number
) => {
  return useInfiniteQuery<ArticleCommentListResponse>({
    queryKey: ['articleComments', articleId, limit],
    queryFn: ({ pageParam = 0 }) =>
      getArticleComments({ limit, cursor: pageParam as number, articleId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled: !!articleId,
  });
};

export const useDeleteArticleCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteArticleComment(commentId),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['articleComments'] });
    },
  });
};

export const useUpdateArticleCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => updateArticleComment(commentId, content),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries({ queryKey: ['articleComments'] });
    },
  });
};
