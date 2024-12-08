import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const [redirected, setRedirected] = useState(false);
  const router = useRouter();
  if (
    axios.isAxiosError(error) &&
    error.response?.status === 401 &&
    !redirected
  ) {
    router.push('/signin'); // 로그인 페이지로 리다이렉트
    setRedirected(true);
    return; // 더 이상 처리를 하지 않음
  }
  return (
    <div>
      <h2>{error.message}</h2>
      <Button
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.Gray}
        textSize={TextSize.Large}
        buttonWidth={ButtonWidth.Full}
        buttonBackgroundColor={ButtonBackgroundColor.Green}
        buttonBorderColor={ButtonBorderColor.Green}
        buttonPadding={ButtonPadding.Medium}
        onClick={() => resetErrorBoundary()}
      >
        재시도하기
      </Button>
    </div>
  );
}
