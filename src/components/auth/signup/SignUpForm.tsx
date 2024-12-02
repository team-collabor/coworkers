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
import { signUpSchema } from '@/constants/formSchemas/authSchema';
import { useSignIn, useSignUp } from '@/queries/auth.queries';
import { SignUpRequest } from '@/types/dto/requests/auth.request.types';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type SignUpError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

function SignUpForm() {
  const router = useRouter();
  const {
    signUp,
    isSuccess: isSignUpSuccess,
    isPending,
    error: signUpError,
    variables: signUpVariables,
  } = useSignUp();
  const { login, isSuccess: isSignInSuccess, error: signInError } = useSignIn();

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
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpRequest) => {
    signUp(data);
  };

  useEffect(() => {
    if (isSignUpSuccess && !isSignInSuccess) {
      reset();
      login({
        email: signUpVariables.email,
        password: signUpVariables.password,
      });
    }

    if (isSignInSuccess) {
      reset();
      router.replace('/withoutteam');
    } else if (signInError) {
      reset();
      router.replace('/signin');
    }
  }, [
    isSignUpSuccess,
    isSignInSuccess,
    signInError,
    signUpVariables,
    reset,
    router,
    login,
  ]);

  return (
    <>
      <Head>
        <title>회원가입 - Coworkers</title>
        <meta
          name="description"
          content="Coworkers에 가입하여 팀 협업을 시작하세요! 쉽고 빠른 회원가입 기능을 제공합니다."
        />
        <meta property="og:title" content="회원가입 - Coworkers" />
        <meta
          property="og:description"
          content="회원가입 후 팀과 함께 효율적인 협업을 시작하세요."
        />
        <meta
          property="og:url"
          content="https://coworkers-colla.netlify.app/signup"
        />
      </Head>
      <form
        className="flex w-full flex-col gap-7 font-pretendard"
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
    </>
  );
}

export default SignUpForm;
