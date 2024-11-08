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
import { signInSchema } from '@/constants/formSchemas/authSchema';
import { useSignIn } from '@/queries/auth.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { SignInRequest } from '@/types/dto/requests/auth.request.types';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
  const { user } = useAuthStore();
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
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInRequest) => {
    login(data);
  };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
    if (isSuccess) {
      reset();
      router.replace('/');
    }
  }, [isSuccess, router, reset, user]);

  return (
    <>
      <Head>
        <title>로그인 - Coworkers</title>
        <meta
          name="description"
          content="로그인하여 팀원들과 함께 협업하고 할 일을 관리하세요."
        />
        <meta property="og:title" content="로그인 - Coworkers" />
        <meta
          property="og:description"
          content="Coworkers에 로그인하고 팀과 함께 프로젝트를 진행하세요."
        />
        <meta
          property="og:url"
          content="https://coworkers-colla.netlify.app/signin"
        />
      </Head>
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
      </form>{' '}
    </>
  );
}

export default SignInForm;
