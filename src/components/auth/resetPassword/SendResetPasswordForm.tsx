/* eslint-disable max-len */
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
import { useModalContext } from '@/components/modal/model/modal.context';
import { sendResetPasswordSchema } from '@/constants/formSchemas/authSchema';
import { useSendResetPasswordEmail } from '@/queries/users.queries';
import { SendResetPasswordEmailRequest } from '@/types/dto/requests/users.request.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

function SendResetPasswordForm() {
  const { mutate: sendResetPassword, isPending } = useSendResetPasswordEmail();
  const { toggle } = useModalContext();

  const { register, handleSubmit } = useForm<SendResetPasswordEmailRequest>({
    mode: 'onBlur',
    resolver: zodResolver(sendResetPasswordSchema),
  });

  const onSubmit = (data: SendResetPasswordEmailRequest) => {
    data.redirectUrl =
      process.env.NEXT_PUBLIC_RESET_PASSWORD_REDIRECT_URL || '';
    sendResetPassword(data, {
      onSuccess: () => {
        toggle();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        id="email-input"
        placeholder="이메일을 입력해주세요."
        {...register('email')}
      />
      <div className="mt-4 flex justify-center gap-2">
        <Button
          type="button"
          className="text-brand-primary"
          buttonStyle={ButtonStyle.Box}
          buttonWidth={ButtonWidth.Full}
          textSize={TextSize.Medium}
          textColor={TextColor.Green}
          buttonBackgroundColor={ButtonBackgroundColor.White}
          buttonBorderColor={ButtonBorderColor.Green}
          buttonPadding={ButtonPadding.Medium}
          onClick={toggle}
        >
          닫기
        </Button>
        <Button
          type="submit"
          buttonStyle={ButtonStyle.Box}
          buttonWidth={ButtonWidth.Full}
          textSize={TextSize.Medium}
          textColor={TextColor.White}
          buttonBackgroundColor={ButtonBackgroundColor.Green}
          buttonBorderColor={ButtonBorderColor.Green}
          buttonPadding={ButtonPadding.Medium}
          disabled={isPending}
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : '링크 보내기'}
        </Button>
      </div>
    </form>
  );
}

export default SendResetPasswordForm;
