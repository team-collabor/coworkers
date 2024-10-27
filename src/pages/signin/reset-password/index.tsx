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
import { resetPasswordSchema } from '@/constants/formSchemas/authSchema';
import { useResetPassword } from '@/queries/users.queries';
import { ResetPasswordRequest } from '@/types/dto/requests/users.request.types';
import { cn } from '@/utils/tailwind/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const { isPending, mutate: resetPassword } = useResetPassword();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors: validErrors },
  } = useForm<ResetPasswordRequest>({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordRequest) => {
    resetPassword(
      { ...data, token: searchParams.get('token') as string },
      {
        onSuccess: () => router.push('/signin'),
      }
    );
  };

  return (
    <section
      className={cn(
        'mt-[8.75rem] flex w-full max-w-[28.75rem] flex-col items-center',
        'tab:mt-[6.25rem] mob:mt-[1.5rem]'
      )}
    >
      <div
        className="mb-20 font-pretendard text-4xl
										tab:text-2xl-medium
										mob:mb-7 mob:text-2xl-medium"
      >
        비밀번호 재설정
      </div>
      <form
        className="flex w-full flex-col gap-7 font-pretendard"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          type="password"
          id="password-input"
          label="새 비밀번호"
          placeholder="비밀번호 (영문, 특수문자, 숫자 포함, 최대 12자)를 입력해주세요."
          hasVisibilityButton
          {...register('password')}
          errorMessage={validErrors.password?.message}
        />
        <Input
          type="password"
          id="password-confirmation-input"
          label="비밀번호 확인"
          placeholder="새 비밀번호를 다시 한번 입력해주세요."
          {...register('passwordConfirmation')}
          errorMessage={validErrors.passwordConfirmation?.message}
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
          disabled={isPending}
        >
          재설정
        </Button>
      </form>
    </section>
  );
}

export default ResetPasswordPage;
