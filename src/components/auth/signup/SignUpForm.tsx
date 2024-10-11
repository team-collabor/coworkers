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
import useSignUp from '@/hooks/auth/useSignUp';
import { SignUpRequest } from '@/types/dto/requests/auth.request.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function SignUpForm() {
  const { signUp, isSuccess } = useSignUp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpRequest>();

  const onSubmit = (data: SignUpRequest) => {
    signUp(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    if (isSuccess) {
      router.replace('/signin');
    }
  }, [isSubmitSuccessful, reset, isSuccess, router]);

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
        label="이름"
        placeholder="이름을 입력해주세요."
        {...register('nickname', {
          required: { value: true, message: '닉네임은 필수 입력입니다.' },
          maxLength: {
            value: 20,
            message: '닉네임은 최대 20자까지 가능합니다.',
          },
        })}
        errorMessage={errors.nickname?.message}
      />
      <Input
        type="email"
        id="email-input"
        label="이메일"
        placeholder="이메일을 입력해주세요."
        {...register('email', {
          required: { value: true, message: '이메일은 필수 입력입니다.' },
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
          required: { value: true, message: '비밀번호는 필수 입력입니다.' },
        })}
        errorMessage={errors.password?.message}
      />
      <Input
        type="password"
        id="password-check-input"
        label="비밀번호 확인"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        hasVisibilityButton
        {...register('passwordConfirmation', {
          required: {
            value: true,
            message: '비밀번호 확인은 필수 입력입니다.',
          },
        })}
        errorMessage={errors.passwordConfirmation?.message}
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
        회원가입
      </Button>
    </form>
  );
}

export default SignUpForm;
