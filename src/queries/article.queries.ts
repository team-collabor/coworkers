/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  deleteArticle,
  deleteArticleComment,
  getArticleComments,
  getArticleDetail,
  getArticles,
  likeArticle,
  postArticle,
  postArticleComment,
  unlikeArticle,
  updateArticle,
  updateArticleComment,
} from '@/apis/article.api';
import {
  GetArticlesParams,
  PostArticleCommentParams,
  PostArticleParams,
  UpdateArticleParams,
} from '@/types/dto/requests/article.request.types';
// eslint-disable-next-line max-len
import { toast } from '@/hooks/useToast';
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
import { articleQueryKeys } from './keys/article.keys';

// article

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
    queryKey: articleQueryKeys.allArticles(orderBy, searchValue),
    queryFn: ({ pageParam = 1 }) =>
      getArticles({
        page: pageParam as number,
        pageSize,
        orderBy,
        keyword: searchValue,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalCount / pageSize
        ? allPages.length + 1
        : undefined,
  });
};

export const usePostArticleMutation = (
  searchQuery: string,
  orderBy: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (article: PostArticleParams) => postArticle(article),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.allArticles(orderBy, searchQuery),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.bestArticles(),
      });
    },
  });
};

export const useGetArticleDetailQuery = (articleId: number) => {
  return useQuery({
    queryKey: articleQueryKeys.article(articleId),
    queryFn: () => getArticleDetail(articleId),
    enabled: !Number.isNaN(articleId),
  });
};

export const useUpdateArticleMutation = (
  articleId: number,
  searchQuery: string,
  orderBy: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateArticleParams) => updateArticle(articleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.article(articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.allArticles(orderBy, searchQuery),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.bestArticles(),
      });
      toast({
        title: '게시글 수정에 성공하였습니다.',
      });
    },
    onError: () => {
      toast({
        title: '게시글 수정에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteArticleMutation = (
  articleId: number,
  searchQuery: string,
  orderBy: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.allArticles(orderBy, searchQuery),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.bestArticles(),
      });
      toast({
        title: '게시글 삭제에 성공하였습니다.',
      });
    },
    onError: () => {
      toast({
        title: '게시글 삭제에 실패하였습니다.',
        variant: 'destructive',
      });
    },
  });
};

export const useLikeArticleMutation = (
  searchQuery: string,
  orderBy: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (articleId: number) => likeArticle(articleId),
    onSuccess: (_, articleId) => {
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.article(articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.allArticles(orderBy, searchQuery),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.bestArticles(),
      });
    },
  });
};

export const useUnlikeArticleMutation = (
  searchQuery: string,
  orderBy: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (articleId: number) => unlikeArticle(articleId),
    onSuccess: (_, articleId) => {
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.article(articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.allArticles(orderBy, searchQuery),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.bestArticles(),
      });
    },
  });
};

// article comment

export const usePostArticleCommentMutation = (
  searchQuery: string,
  orderBy: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PostArticleCommentParams) => postArticleComment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.articleComments(variables.articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.article(variables.articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.allArticles(orderBy, searchQuery),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.bestArticles(),
      });
    },
  });
};

export const useGetArticleCommentsQuery = (
  articleId: number,
  limit: number
) => {
  return useInfiniteQuery<ArticleCommentListResponse>({
    queryKey: articleQueryKeys.articleComments(articleId),
    queryFn: ({ pageParam = 0 }) =>
      getArticleComments({ limit, cursor: pageParam as number, articleId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    enabled: !!articleId,
  });
};

export const useDeleteArticleCommentMutation = (
  articleId: number,
  searchQuery: string,
  orderBy: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteArticleComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.articleComments(articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.article(articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.allArticles(orderBy, searchQuery),
      });
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.bestArticles(),
      });
    },
  });
};

export const useUpdateArticleCommentMutation = ({
  articleId,
}: {
  articleId: number;
}) => {
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
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.articleComments(articleId),
      });
    },
  });
};
