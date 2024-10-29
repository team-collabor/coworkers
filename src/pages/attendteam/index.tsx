/* eslint-disable no-console */
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
import { useToast } from '@/hooks/useToast';
import { useInviteGroupMutation } from '@/queries/groups.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const teamSchema = z.object({
  link: z.string().min(1, { message: '팀 링크를 입력해주세요.' }),
});

type TeamLinkValues = z.infer<typeof teamSchema>;

export default function AttendTeam() {
  const router = useRouter();
  const teamMutation = useInviteGroupMutation();

  const user = useAuthStore();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamLinkValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      link: '',
    },
  });

  const onSubmit = (data: TeamLinkValues) => {
    if (!user.user) {
      toast({
        title: '참여 실패',
        description: '로그인 후 이용해주세요.',
        variant: 'destructive',
      });
      router
        .replace('/signin')
        .catch((error) => console.error('라우팅 오류:', error));
    } else {
      teamMutation.mutate(
        {
          userEmail: user.user?.email,
          token: data.link,
        },
        {
          onError: () => {
            toast({
              title: '참여 실패',
              variant: 'destructive',
            });
          },
          onSuccess: () => {
            router
              .replace('/')
              .catch((error) => console.error('라우팅 오류:', error));
          },
        }
      );
    }
  };

  return (
    <form
      className="mt-[12.5rem] flex flex-col items-center gap-20 
      tab:mt-[10rem] mob:mt-[8.25rem] mob:px-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-4xl tab:text-2xl">팀 참여하기</p>
      <div className="flex flex-col items-start gap-8 ">
        <Input
          id="team-link"
          type="text"
          label="팀 링크"
          placeholder="팀 링크를 입력해주세요."
          {...register('link')}
          errorMessage={errors.link?.message}
        />
        <Button
          buttonStyle={ButtonStyle.Box}
          textColor={TextColor.White}
          textSize={TextSize.Medium}
          buttonWidth={ButtonWidth.Full}
          buttonBackgroundColor={ButtonBackgroundColor.Green}
          buttonBorderColor={ButtonBorderColor.Gray}
          buttonPadding={ButtonPadding.Medium}
          type="submit"
        >
          참여하기
        </Button>
        <p className="text-lg-regular mob:text-md-regular">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </p>
      </div>
    </form>
  );
}
