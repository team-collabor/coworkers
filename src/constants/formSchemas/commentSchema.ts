import { z } from 'zod';

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, '댓글을 입력해주세요.')
    .max(200, '최대 200자입니다.'),
});
