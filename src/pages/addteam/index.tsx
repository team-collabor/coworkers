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
import {
  useTeamMutation,
  useUploadImageMutation,
} from '@/queries/groups.queries';
import { Team } from '@/types/team';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

function AddTeam() {
  const [team, setTeam] = useState<Team>({
    name: '',
    image: '/icons/BaseTeam_Icon.svg',
  });

  const [selectImage, setSelectImage] = useState<File | null>(null);

  const [isError, setIsError] = useState({
    name: false,
    image: false,
    imageDuplicate: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const teamMutation = useTeamMutation();
  const uploadImageMutation = useUploadImageMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTeam({ ...team, image: imageUrl });
      setSelectImage(file);

      if (imageUrl !== '/icons/BaseTeam_Icon.svg' && imageUrl !== '') {
        setIsError((prev) => ({ ...prev, image: false }));
      }
    }
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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 팀 이름 유효성 검사
    if (team.name.length < 1) {
      setIsError((prev) => ({ ...prev, name: true }));
    }

    // 이미지 URL 유효성 검사 (기본 이미지가 아닌 경우)
    if (team.image === '/icons/BaseTeam_Icon.svg') {
      setIsError((prev) => ({ ...prev, image: true }));
    }
    // 에러가 있는지 다시 확인
    if (
      team.name.length < 1 ||
      team.image === '/icons/BaseTeam_Icon.svg' ||
      isError.imageDuplicate ||
      !selectImage
    ) {
      // console.log('팀 생성에 실패했습니다. 입력 정보를 확인해주세요.');
    } else {
      // console.log('팀이 성공적으로 생성되었습니다:', team);

      const imageUrl = await uploadImageMutation.mutateAsync(selectImage);

      teamMutation.mutate({ name: team.name, image: imageUrl });
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
      <div className="flex  flex-col  items-center gap-8 ">
        <div className="flex w-full flex-col">
          <div className="relative flex flex-col ">
            <Input
              id="teamImage"
              label="팀 프로필"
              type="file"
              name="teamImage"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <div className="relative mb-2 inline-block h-16 w-16">
              <button
                type="button"
                aria-label="팀 프로필 이미지 추가"
                onClick={handleImageClick}
                className="h-16 w-16 rounded-full border-2 border-primary"
              >
                <Image
                  src={team.image}
                  alt="팀 프로필"
                  width={64}
                  height={64}
                />
              </button>
              <div
                className="absolute bottom-0 right-0 flex h-5 w-5 
                translate-x-1 translate-y-1 transform items-center
                justify-center rounded-full border
                border-primary bg-tertiary"
              >
                <Image
                  src="/icons/Edit_small.svg"
                  alt="편집"
                  width={10}
                  height={10}
                />
              </div>
            </div>
            {isError.image && (
              <p
                className="ml-5 mt-3 
              font-pretendard text-md-medium text-status-danger"
              >
                프로필 이미지를 넣어주세요.
              </p>
            )}
          </div>
        </div>
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

export default AddTeam;
