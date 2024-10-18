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
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function AttendTeam() {
  const [teamLink, setTeamLink] = useState('');
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const teamMutation = useInviteGroupMutation();

  const user = useAuthStore();

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamLink(event.target.value);
    setIsError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (teamLink.length < 1) {
      setIsError(true);
    } else if (!user.user) {
      console.log('로그인 후 이용해주세요.');
      router
        .replace('/signin')
        .catch((error) => console.error('라우팅 오류:', error));
    } else {
      teamMutation.mutate(
        {
          userEmail: user.user?.email,
          token: teamLink,
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
      onSubmit={handleSubmit}
    >
      <p className="text-4xl tab:text-2xl">팀 참여하기</p>

      <Input
        id="team-link"
        type="text"
        label="팀 링크"
        placeholder="팀 링크를 입력해주세요."
        onChange={handleLinkChange}
        errorMessage={isError ? '팀 링크를 입력해주세요.' : ''}
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
