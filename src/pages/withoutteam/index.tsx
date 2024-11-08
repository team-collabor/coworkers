import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function WithOutTeam() {
  return (
    <>
      <Head>
        <title>팀 생성 및 참가 - Coworkers</title>
        <meta
          name="description"
          content="Coworkers에서 새로운 팀에 참가하거나 팀을 생성하여 협업을 시작해 보세요."
        />
        <meta property="og:title" content="팀 없음 - Coworkers" />
        <meta
          property="og:description"
          content="새로운 팀에 참가하거나 팀을 생성하여 Coworkers에서 협업을 시작하세요."
        />
        <meta
          property="og:url"
          content="https://coworkers-colla.netlify.app/withoutteam"
        />
      </Head>
      <div className="mt-[14rem] flex flex-col items-center gap-20">
        <Image
          src="/images/WithoutTeam.svg"
          alt="withoutTeam"
          width={810}
          height={255}
          className="h-auto w-full max-w-[700px] 
        tab:max-w-[520px] mob:max-w-[312px]"
        />
        <div className="flex w-[11.625rem] flex-col gap-4">
          <Link href="/addteam">
            <Button
              buttonStyle={ButtonStyle.Box}
              textColor={TextColor.White}
              textSize={TextSize.Large}
              buttonWidth={ButtonWidth.Full}
              buttonBackgroundColor={ButtonBackgroundColor.Green}
              buttonBorderColor={ButtonBorderColor.Green}
              buttonPadding={ButtonPadding.Medium}
            >
              팀 생성하기
            </Button>
          </Link>
          <Link href="attendteam">
            <Button
              buttonStyle={ButtonStyle.Box}
              textColor={TextColor.Green}
              textSize={TextSize.Large}
              buttonWidth={ButtonWidth.Full}
              buttonBackgroundColor={ButtonBackgroundColor.None}
              buttonBorderColor={ButtonBorderColor.Green}
              buttonPadding={ButtonPadding.Medium}
            >
              팀 참여하기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
