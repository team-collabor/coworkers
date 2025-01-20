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
import { attendTeamSchema } from '@/constants/formSchemas/teamSchema';
import { useRedirect } from '@/hooks/useRedirect';
import { useToast } from '@/hooks/useToast';
import { useInviteGroupMutation } from '@/queries/groups.queries';
import { useAuthStore } from '@/store/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TeamLinkValues = z.infer<typeof attendTeamSchema>;

export default function AttendTeam() {
  const router = useRouter();
  const teamMutation = useInviteGroupMutation();
  const user = useAuthStore();
  const { toast } = useToast();
  useRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamLinkValues>({
    resolver: zodResolver(attendTeamSchema),
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
      router.replace('/signin');
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
            router.replace('/');
          },
        }
      );
    }
  };

  return (
    <>
      <Head>
        <title>팀 참가 - Coworkers</title>
        <meta
          name="description"
          content="Coworkers에서 팀에 참가하여 함께 협업을 시작하세요.
           팀에 참가하면 할 일을 관리하고 팀원들과 소통할 수 있습니다."
        />
        <meta property="og:title" content="팀 참가 - Coworkers" />
        <meta
          property="og:description"
          content="새로운 팀에 참가하고 팀원들과 함께 프로젝트를 진행하세요."
        />
        <meta
          property="og:url"
          content="https://coworkers-colla.netlify.app/attendteam"
        />
      </Head>
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
    </>
  );
}
