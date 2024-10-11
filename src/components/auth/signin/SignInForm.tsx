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
import Link from 'next/link';

function SignInForm() {
  return (
    <form className="flex w-full flex-col gap-7 font-pretendard">
      <Input
        type="email"
        id="email-input"
        label="이메일"
        placeholder="이메일을 입력해주세요."
      />
      <Input
        type="password"
        id="password-input"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        hasVisibilityButton
      />
      <Button
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
