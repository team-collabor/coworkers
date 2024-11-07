import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, '이메일은 필수 입력입니다.')
  .email('이메일 형식으로 작성해 주세요.');

export const nicknameSchema = z
  .string()
  .min(1, '닉네임은 필수 입력입니다.')
  .max(20, '닉네임은 최대 20자까지 가능합니다.');

export const passwordSchema = z
  .string()
  .min(1, '비밀번호는 필수 입력입니다.')
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  .regex(
    /^[A-Za-z0-9!@#$%^&*]+$/,
    '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.'
  )
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    '비밀번호는 숫자, 영문, 특수문자가 포함되어야 합니다.'
  );

export const passwordConfirmationSchema = z
  .string()
  .min(1, '비밀번호 확인은 필수 입력입니다.')
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다.');

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    nickname: nicknameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  passwordConfirmation: passwordConfirmationSchema,
});

export const sendResetPasswordSchema = z.object({
  email: emailSchema,
});
