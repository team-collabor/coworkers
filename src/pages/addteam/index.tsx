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
import { TeamCreate } from '@/types/team';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

function AddTeam() {
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

  // image file extension checker
  const imageExtensionValidCheck = (fileName: string) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'webp'];
    const extension = fileName.split('.').pop()?.toLowerCase();

    if (!extension) return false;

    return imageExtensions.includes(extension);
  };

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const teamMutation = useTeamMutation();
  const uploadImageMutation = useUploadImageMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 이미지 파일 확장자 검사
      if (!imageExtensionValidCheck(file.name)) {
        alert('이미지 확장자는 jpg, jpeg, png, bmp, webp만 가능합니다');
        return;
      }

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
