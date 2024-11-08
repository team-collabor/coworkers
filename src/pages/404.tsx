import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="페이지를 찾을 수 없습니다." />
        <meta property="og:title" content="404 Not Found" />
        <meta property="og:description" content="페이지를 찾을 수 없습니다." />
        <meta
          property="og:url"
          content="https://coworkers-colla.netlify.app/404"
        />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h1
            className="relative mt-[50px] text-[10rem] text-brand-primary 
          mob:text-[6rem]"
          >
            <span className="relative inline-block animate-bounce404-1">4</span>
            <span className="relative inline-block animate-bounce404-2">0</span>
            <span className="relative inline-block animate-bounce404-3">4</span>
          </h1>
          <h2 className="text-[5rem] mob:text-[3rem] ">Not Found</h2>
        </div>
        <p className="mb-10 text-2xl mob:text-xl-semibold">
          페이지를 찾을 수 없습니다.
        </p>
        <Link href="/">
          <Button
            textSize={TextSize.Large}
            buttonStyle={ButtonStyle.Box}
            textColor={TextColor.White}
            buttonBackgroundColor={ButtonBackgroundColor.None}
            buttonBorderColor={ButtonBorderColor.LightGray}
            buttonPadding={ButtonPadding.Large}
            className="border-2"
          >
            메인 페이지로 돌아가기
          </Button>
        </Link>
      </div>
    </>
  );
}
