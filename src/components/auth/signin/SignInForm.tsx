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
import { useSignIn } from '@/queries/auth.queries';
import { SignInRequest } from '@/types/dto/requests/auth.request.types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.')
    .email('이메일 형식으로 작성해 주세요.'),
  password: z
    .string()
    .min(1, '비밀번호는 필수 입력입니다.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

type SignInError = {
  response?: {
    data?: {
      details?: {
        email?: {
          message?: string;
        };
        password?: {
          message?: string;
        };
      };
      message?: string;
    };
  };
};

function SignInForm() {
  const { login, isSuccess, isPending, error: signInError } = useSignIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: validErrors },
  } = useForm<SignInRequest>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SignInRequest) => {
    login(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      router.push('/');
    }
  }, [isSuccess, router, reset]);

  return (
    <form
      className="flex w-full flex-col gap-7 font-pretendard"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        type="email"
        id="email-input"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        {...register('email')}
        errorMessage={validErrors.email?.message}
      />
      <Input
        type="password"
        id="password-input"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        hasVisibilityButton
        {...register('password')}
        errorMessage={validErrors.password?.message}
      />
      {signInError && (
        <p className="ml-2 text-md-semibold text-status-danger">
          {(signInError as SignInError).response?.data?.message}
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
        로그인
      </Button>
      <div className="flex justify-center gap-2 text-lg-medium text-primary">
        <p>아직 계정이 없으신가요?</p>
        <Link className="text-interaction-focus underline" href="/signup">
          가입하기
        </Link>
      </div>
    </form>
  );
}

export default SignInForm;
