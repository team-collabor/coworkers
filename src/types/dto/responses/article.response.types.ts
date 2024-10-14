export interface Writer {
  nickname: string;
  id: number;
}

export interface Article {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image: string;
  title: string;
  id: number;
}

export interface ArticleListResponse {
  totalCount: number;
  list: Article[];
}
