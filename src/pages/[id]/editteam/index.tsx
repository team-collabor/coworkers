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
import ProfileInput from '@/components/Team/ProfileInput';
import { usePatchTeamMutation, useTeamQuery } from '@/queries/groups.queries';
import { useUploadImageMutation } from '@/queries/uploadImage.query';
import { TeamCreate } from '@/types/team';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function EditTeam() {
  const router = useRouter();
  const { id } = router.query;
  const { team } = useTeamQuery(Number(id));
  const patchTeam = usePatchTeamMutation();
  const uploadImageMutation = useUploadImageMutation();
  const queryClient = useQueryClient();

  const [editTeam, setEditTeam] = useState<TeamCreate>({
    name: '',
    image: '/icons/BaseTeam_Icon.svg',
  });

  const [selectImage, setSelectImage] = useState<File | null>(null);

  const [isEditError, setIsEditError] = useState({
    name: false,
    image: false,
    nameDuplicate: false,
  });

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setEditTeam({ ...editTeam, image: imageUrl });
    setSelectImage(file);
    setIsEditError((prev) => ({ ...prev, image: false }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setEditTeam({ ...editTeam, name });

    if (name.length < 1) {
      setIsEditError({ ...isEditError, name: true });
    } else {
      setIsEditError({ ...isEditError, name: false });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(team, editTeam.image, team?.image, team?.id);

    if (editTeam.name.length < 1) {
      setIsEditError((prev) => ({ ...prev, name: true }));
      return;
    }

    try {
      const updateData: { id: number; name: string; image?: string } = {
        id: Number(id),
        name: editTeam.name,
      };

      if (selectImage) {
        const imageUrl = await uploadImageMutation.mutateAsync(selectImage);
        updateData.image = imageUrl;
      }

      await patchTeam.mutateAsync(updateData);
      await queryClient.invalidateQueries({ queryKey: ['team'] });
      await router.replace(`/${team?.id}`);
    } catch (error) {
      console.error('팀 업데이트 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (team) {
      setEditTeam({
        name: team.name,
        image: team.image || '/icons/BaseTeam_Icon.svg',
      });
    }
  }, [team]);
  return (
    <form
      className="mt-[12.5rem] flex flex-col items-center gap-20 
      tab:mt-[10rem] mob:mt-[8.25rem] mob:px-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
    >
      <p className="text-4xl tab:text-2xl">팀 수정하기</p>
      <div className="flex  flex-col  items-center gap-8 ">
        <div className="flex w-full flex-col">
          <ProfileInput
            image={editTeam.image}
            onImageChange={handleImageChange}
            error={isEditError.image}
          />
        </div>
        <Input
          id="name"
          type="text"
          label="팀 이름"
          placeholder="팀 이름을 입력해주세요."
          value={editTeam.name}
          onChange={handleNameChange}
          errorMessage={isEditError.name ? '팀 이름을 입력해주세요.' : ''}
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
          수정하기
        </Button>
        <p className="text-lg-regular mob:text-md-regular">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </form>
  );
}
