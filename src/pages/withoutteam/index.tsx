import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function WithOutTeam() {
  return (
    <div className="mt-[14rem] flex flex-col items-center gap-20">
      <Image
        src="/images/WithoutTeam.svg"
        alt="withoutTeam"
        width={810}
        height={255}
        className="h-auto w-full max-w-[700px] 
        tab:max-w-[520px] mob:max-w-[312px]"
      />
      <span className="text-center text-lg-medium text-default">
        아직 소속된 팀이 없습니다.
        <br />
        팀을 생성하거나 팀에 참여해보세요.
      </span>
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
  );
}
