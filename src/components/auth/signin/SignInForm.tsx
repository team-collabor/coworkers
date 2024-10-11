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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function SignInForm() {
  const { login, isSuccess } = useSignIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignInRequest>();

  const onSubmit = (data: SignInRequest) => {
    login(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }

    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router, isSubmitSuccessful, reset]);

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
        {...register('email', {
          required: {
            value: true,
            message: '이메일을 입력해주세요',
          },
          pattern: {
            value:
              // eslint-disable-next-line max-len
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: '이메일 형식이 올바르지 않습니다',
          },
        })}
        errorMessage={errors.email?.message}
      />
      <Input
        type="password"
        id="password-input"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        hasVisibilityButton
        {...register('password', {
          required: {
            value: true,
            message: '비밀번호를 입력해주세요',
          },
        })}
        errorMessage={errors.password?.message}
      />
      <Button
        type="submit"
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.White}
        textSize={TextSize.Large}
        buttonWidth={ButtonWidth.Full}
        buttonBackgroundColor={ButtonBackgroundColor.Green}
        buttonBorderColor={ButtonBorderColor.None}
        buttonPadding={ButtonPadding.Large}
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
