import { FrequencyType } from '@/types/tasks.types';
import { z } from 'zod';

export const taskTitleSchema = z.object({
  title: z
    .string()
    .min(1, '제목은 필수 입력입니다.')
    .max(30, '제목은 최대 30 글자입니다.'),
});

export const taskDescriptionSchema = z.object({
  description: z.string().max(250, '설명은 최대 250 글자입니다.'),
});

export const taskFrequencySchema = z.object({
  frequency: z.nativeEnum(FrequencyType, {
    errorMap: () => ({ message: '올바르지 않은 반복 주기입니다.' }),
  }),
});

export const taskTimeSchema = z.object({
  time: z.union([
    z.string().max(0), // 빈 문자열만 통과
    z.coerce.date({
      errorMap: () => ({ message: '올바른 시간 형식이 아닙니다.' }),
    }),
  ]),
});

export const taskWeekDaysSchema = z.object({
  weekDays: z
    .array(
      z.number().refine((value) => value >= 0 && value <= 6, {
        message: '유효하지 않은 값입니다.',
      })
    )
    .min(1, '최소 하나의 요일을 선택해주세요.'),
});

export const addTaskSchema = z.object({
  title: taskTitleSchema,
  description: taskDescriptionSchema,
  frequency: taskFrequencySchema,
  time: taskTimeSchema,
  weekDays: taskWeekDaysSchema,
});
