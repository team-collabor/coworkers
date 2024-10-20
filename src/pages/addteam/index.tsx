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
import ProfileInput from '@/components/Team/ProfileInput';
import { useTeamMutation } from '@/queries/groups.queries';
import { useUploadImageMutation } from '@/queries/uploadImage.query';
import { TeamCreate } from '@/types/team';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function AddTeam() {
  const [team, setTeam] = useState<TeamCreate>({
    name: '',
    image: '/icons/BaseTeam_Icon.svg',
  });

  const [selectImage, setSelectImage] = useState<File | null>(null);

  const [isError, setIsError] = useState({
    name: false,
    image: false,
    nameDuplicate: false,
  });

  const router = useRouter();
  const teamMutation = useTeamMutation();
  const uploadImageMutation = useUploadImageMutation();

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setTeam({ ...team, image: imageUrl });
    setSelectImage(file);
    setIsError((prev) => ({ ...prev, image: false }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setTeam({ ...team, name });

    if (name.length < 1) {
      setIsError({ ...isError, name: true });
    } else {
      setIsError({ ...isError, name: false });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (team.name.length < 1) {
      setIsError((prev) => ({ ...prev, name: true }));
    } else if (team.image === '/icons/BaseTeam_Icon.svg' || !selectImage) {
      setIsError((prev) => ({ ...prev, image: true }));
    } else if (isError.nameDuplicate) {
      // console.log('이름 중복');
    } else {
      const imageUrl = await uploadImageMutation.mutateAsync(selectImage);

      const newTeam = await teamMutation.mutateAsync({
        name: team.name,
        image: imageUrl,
      });

      await router.replace(`/${newTeam.id}`);
    }
  };

  return (
    <form
      className="mt-[12.5rem] flex flex-col items-center gap-20 
    tab:mt-[10rem] mob:mt-[8.25rem] mob:px-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
    >
      <p className="text-4xl tab:text-2xl">팀 생성하기</p>
      <div className="flex flex-col items-start gap-8 ">
        <ProfileInput
          image={team.image}
          onImageChange={handleImageChange}
          error={isError.image}
        />
        <Input
          id="name"
          type="text"
          label="팀 이름"
          placeholder="팀 이름을 입력해주세요."
          onChange={handleNameChange}
          errorMessage={isError.name ? '팀 이름을 입력해주세요.' : ''}
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
          생성하기
        </Button>
        <p className="text-lg-regular mob:text-md-regular">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </form>
  );
}
