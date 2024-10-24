export type Writer = {
  image?: string;
  nickname: string;
  id: number;
};

export type Article = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image: string;
  title: string;
  id: number;
};

export type ArticleDetail = Article & {
  commentCount: number;
  isLiked: boolean;
  content: string;
};
