import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import Input from '@/components/common/Input';
import { useSignUp } from '@/queries/auth.queries';
import { SignUpRequest } from '@/types/dto/requests/auth.request.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    nickname: z
      .string()
      .min(1, '닉네임은 필수 입력입니다.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.'),
    email: z
      .string()
      .min(1, '이메일은 필수 입력입니다.')
      .email('이메일 형식으로 작성해 주세요.'),
    password: z
      .string()
      .min(1, '비밀번호는 필수 입력입니다.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^[A-Za-z0-9!@#$%^&*]+$/,
        '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.'
      ),
    passwordConfirmation: z
      .string()
      .min(1, '비밀번호 확인은 필수 입력입니다.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

type SignUpError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

function SignUpForm() {
  const { signUp, isSuccess, isPending, error: signUpError } = useSignUp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpRequest>({
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SignUpRequest) => {
    signUp(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      router.replace('/signin');
    }
  }, [reset, isSuccess, router]);

  return (
    <form
      className="flex w-full flex-col gap-7 font-pretendard"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        type="text"
        id="name-input"
        label="닉네임"
        placeholder="닉네임을 입력해주세요."
        {...register('nickname')}
        errorMessage={errors.nickname?.message}
      />
      <Input
        type="email"
        id="email-input"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        {...register('email')}
        errorMessage={errors.email?.message}
      />
      <Input
        type="password"
        id="password-input"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        hasVisibilityButton
        {...register('password')}
        errorMessage={errors.password?.message}
      />
      <Input
        type="password"
        id="password-check-input"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        hasVisibilityButton
        {...register('passwordConfirmation')}
        errorMessage={errors.passwordConfirmation?.message}
      />
      {signUpError && (
        <p className="ml-2 text-md-semibold text-status-danger">
          {(signUpError as SignUpError).response?.data?.message}
        </p>
      )}
      <Button
        type="submit"
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.White}
        textSize={TextSize.Large}
        buttonWidth={ButtonWidth.Full}
        buttonBackgroundColor={ButtonBackgroundColor.Green}
        buttonBorderColor={ButtonBorderColor.None}
        buttonPadding={ButtonPadding.Large}
        disabled={isPending}
      >
        회원가입
      </Button>
    </form>
  );
}

export default SignUpForm;
