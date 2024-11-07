import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ServerError() {
  const router = useRouter();

  const handleRefresh = () => {
    router.reload();
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1
          className="relative text-[10rem] 
        text-brand-primary mob:text-[6rem]"
        >
          <span className="relative inline-block animate-bounce404-1">5</span>
          <span className="relative inline-block animate-bounce404-2">0</span>
          <span className="relative inline-block animate-bounce404-3">0</span>
        </h1>
        <h2 className="text-[5rem] mob:text-[3rem]">Server Error</h2>
      </div>
      <p className="mb-2 text-2xl mob:text-xl-semibold">
        서버에 문제가 발생했습니다.
      </p>
      <p className=" mb-10 text-xl mob:text-lg-semibold">
        잠시 후 다시 시도해주세요.
      </p>
      <div className="flex gap-4 mob:flex-col mob:items-center">
        <Button
          onClick={handleRefresh}
          textSize={TextSize.Large}
          buttonStyle={ButtonStyle.Box}
          textColor={TextColor.White}
          buttonBackgroundColor={ButtonBackgroundColor.None}
          buttonBorderColor={ButtonBorderColor.LightGray}
          buttonPadding={ButtonPadding.Large}
          buttonWidth={ButtonWidth.Fit}
          className="border-2 mob:p-2 mob:text-md-semibold"
        >
          새로고침
        </Button>
        <Link href="/">
          <Button
            textSize={TextSize.Large}
            buttonStyle={ButtonStyle.Box}
            textColor={TextColor.White}
            buttonBackgroundColor={ButtonBackgroundColor.None}
            buttonBorderColor={ButtonBorderColor.LightGray}
            buttonPadding={ButtonPadding.Large}
            className="border-2 mob:p-2 mob:text-md-semibold"
          >
            메인 페이지로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
