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
      console.log('로그인 후 이용해주세요.');
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
          onError: (error: any) => {
            if (error) {
              console.log(error.response.data.message);
            } else {
              console.error('오류 발생:', error);
            }
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
      className="mt-[12.5rem] flex flex-col items-center gap-10 
      tab:mt-[10rem] mob:mt-[8.25rem] mob:px-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-4xl tab:text-2xl">팀 참여하기</p>

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
    </form>
  );
}
