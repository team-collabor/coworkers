import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
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
    return;
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1
          className="relative mt-[50px] text-[10rem] text-brand-primary 
         mob:text-[6rem]"
        >
          <span className="relative inline-block animate-bounce404-1">E</span>
          <span className="relative inline-block animate-bounce404-2">R</span>
          <span className="relative inline-block animate-bounce404-1">R</span>
          <span className="relative inline-block animate-bounce404-2">O</span>
          <span className="relative inline-block animate-bounce404-3">R</span>
        </h1>
      </div>
      <p className="mb-10 text-2xl mob:text-xl-semibold">
        {redirected ? '로그인 후 시도해주세요!' : error.response?.data.message}
      </p>

      <Button
        textSize={TextSize.Large}
        buttonStyle={ButtonStyle.Box}
        textColor={TextColor.White}
        buttonBackgroundColor={ButtonBackgroundColor.None}
        buttonBorderColor={ButtonBorderColor.LightGray}
        buttonPadding={ButtonPadding.Large}
        className="border-2"
        onClick={() => resetErrorBoundary()}
      >
        {redirected ? '로그인하기' : '재시도하기'}
      </Button>
    </div>
  );
}
