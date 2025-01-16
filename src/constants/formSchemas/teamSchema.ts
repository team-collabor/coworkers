import { PostGroupRequest } from '@/types/dto/requests/group.request.types';
import { z } from 'zod';

export const teamSchema: z.ZodSchema<PostGroupRequest> = z.object({
  name: z
    .string()
    .min(1, { message: '팀 이름은 필수 입력입니다.' })
    .max(30, { message: '팀 이름은 30글자 이하로 입력해주세요.' }),
  image: z.string().min(1),
});

export const attendTeamSchema = z.object({
  link: z.string().min(1, { message: '팀 링크를 입력해주세요.' }),
});
