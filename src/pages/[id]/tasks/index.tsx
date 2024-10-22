import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import { DatePicker } from '@/components/common/DatePicker';
import IconAndText from '@/components/common/IconAndText';
import Tasks from '@/components/task/Tasks';
import { cn } from '@/utils/tailwind/cn';
import { CalendarPlusIcon, PlusIcon } from 'lucide-react';

export default function TaskPage() {
  return (
    <>
      <section className="mt-10 flex w-full tab:mt-6">
        <h1 className="text-xl-bold text-primary">할 일</h1>
      </section>
      <section className="mt-7 flex w-full items-center justify-between">
        <DatePicker mode="selector" />
        <Button
          buttonStyle={ButtonStyle.Box}
          buttonBackgroundColor={ButtonBackgroundColor.None}
          textColor={TextColor.Green}
          textSize={TextSize.Medium}
          buttonWidth={ButtonWidth.Fit}
          buttonPadding={ButtonPadding.ExtraSmall}
          buttonBorderColor={ButtonBorderColor.None}
        >
          <div className="flex items-center justify-center gap-2">
            <CalendarPlusIcon className="size-4" />
            <span>새로운 목록 추가하기</span>
          </div>
        </Button>
      </section>
      <Tasks />
      <Button
        className={cn(
          'fixed bottom-[5vh] right-[10vw]',
          'tab:bottom-7 tab:right-10',
          'mob:bottom-[1.44rem] mob:right-7'
        )}
        buttonStyle={ButtonStyle.Floating}
        buttonWidth={ButtonWidth.Fit}
        buttonPadding={ButtonPadding.Large}
        buttonBackgroundColor={ButtonBackgroundColor.Green}
        textColor={TextColor.White}
        textSize={TextSize.Large}
        buttonBorderColor={ButtonBorderColor.None}
      >
        <IconAndText
          icon={<PlusIcon className="size-4" />}
          text="할 일 추가"
          wrapperClassName="text-lg-semibold text-primary"
        />
      </Button>
    </>
  );
}
