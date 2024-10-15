export type Writer = {
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

export type ArticleListResponse = {
  totalCount: number;
  list: Article[];
};
