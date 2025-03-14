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
import { teamSchema } from '@/constants/formSchemas/teamSchema';
import { useRedirect } from '@/hooks/useRedirect';
import { useTeamMutation } from '@/queries/groups.queries';
import { useUploadImageMutation } from '@/queries/uploadImage.query';
import { PostGroupRequest } from '@/types/dto/requests/group.request.types';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AddTeam() {
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const router = useRouter();
  const teamMutation = useTeamMutation();
  const uploadImageMutation = useUploadImageMutation();
  useRedirect();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostGroupRequest>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: '',
      image: '/icons/BaseTeam_Icon.svg',
    },
  });

  const watchImage = watch('image');

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectImage(file);
    setValue('image', imageUrl);
  };

  const onSubmit = async (data: PostGroupRequest) => {
    const imageUrl = await uploadImageMutation.mutateAsync(selectImage!);
    const newTeam = await teamMutation.mutateAsync({
      name: data.name,
      image: imageUrl,
    });
    await router.replace(`/${newTeam.id}`);
  };

  return (
    <>
      <Head>
        <title>팀 생성 - Coworkers</title>
        <meta
          name="description"
          content="새로운 팀을 생성하고 팀원을 초대하여 효율적인 협업을 시작하세요."
        />
        <meta property="og:title" content="팀 생성 - Coworkers" />
        <meta
          property="og:description"
          content="새로운 팀을 만들어 업무를 관리하세요."
        />
        <meta
          property="og:url"
          content="https://coworkers-colla.netlify.app/addteam"
        />
      </Head>
      <form
        className="mt-[12.5rem] flex flex-col items-center gap-20 
    tab:mt-[10rem] mob:mt-[8.25rem] mob:px-2"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-4xl tab:text-2xl">팀 생성하기</p>
        <div className="flex flex-col items-start gap-8 ">
          <ProfileInput
            image={watchImage}
            onImageChange={handleImageChange}
            error={!!errors.image}
          />
          <Input
            id="name"
            type="text"
            label="팀 이름"
            placeholder="팀 이름을 입력해주세요."
            {...register('name')}
            errorMessage={errors.name?.message}
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
      </form>{' '}
    </>
  );
}
