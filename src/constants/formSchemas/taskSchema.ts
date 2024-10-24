import { FrequencyType } from '@/types/tasks.types';
import { z } from 'zod';

export const taskTitleSchema = z
  .string()
  .min(1, '제목은 필수 입력입니다.')
  .max(30, '제목은 최대 30 글자입니다.');

export const taskDescriptionSchema = z
  .string()
  .max(250, '설명은 최대 250 글자입니다.');

export const taskFrequencySchema = z.nativeEnum(FrequencyType, {
  errorMap: () => ({ message: '올바르지 않은 반복 주기입니다.' }),
});

export const taskTimeSchema = z.union([
  z.string().max(0), // 빈 문자열만 통과
  z.coerce.date({
    errorMap: () => ({ message: '올바른 시간 형식이 아닙니다.' }),
  }),
]);

export const taskWeekDaysSchema = z.array(
  z.number().refine((value) => value >= 0 && value <= 6, {
    message: '유효하지 않은 값입니다.',
  })
);

export const addTaskSchema = z.object({
  name: taskTitleSchema,
  description: taskDescriptionSchema,
  frequencyType: taskFrequencySchema,
  startDate: taskTimeSchema,
  weekDays: taskWeekDaysSchema,
});
