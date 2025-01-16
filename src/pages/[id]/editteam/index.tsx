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
import { teamSchema } from '@/constants/formSchemas/teamSchema';
import { useToast } from '@/hooks/useToast';
import { usePatchTeamMutation, useTeamQuery } from '@/queries/groups.queries';
import { groupsQueryKeys } from '@/queries/keys/groups.key';
import { useUploadImageMutation } from '@/queries/uploadImage.query';
import {
  PostGroupRequest,
  UpdateGroupRequest,
} from '@/types/dto/requests/group.request.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditTeam() {
  const router = useRouter();
  const { id } = router.query;
  const { data: group } = useTeamQuery(Number(id));
  const patchTeam = usePatchTeamMutation();
  const uploadImageMutation = useUploadImageMutation();
  const queryClient = useQueryClient();
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<PostGroupRequest>({
    resolver: zodResolver(teamSchema),
  });

  const handleImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);

    setSelectImage(file);
    setValue('image', imageUrl);
  };

  const watchImage = watch('image');

  const onSubmit = async (data: PostGroupRequest) => {
    try {
      const updateData: UpdateGroupRequest = {
        id: Number(id),
        name: data.name,
      };

      if (selectImage) {
        const imageUrl = await uploadImageMutation.mutateAsync(selectImage);
        updateData.image = imageUrl;
      }

      await patchTeam.mutateAsync(updateData);
      await queryClient.invalidateQueries({
        queryKey: groupsQueryKeys.groups(group!.id),
      });
      await router.replace(`/${group?.id}`);
    } catch {
      toast({
        title: '업데이트 실패',
        description: '팀 업데이트 중 오류 발생.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (group) {
      reset({
        name: group.name,
        image: group.image,
      });
    }
  }, [group, reset]);

  return (
    <>
      <Head>
        <title>{group?.name}팀 수정 - Coworkers</title>
        <meta
          name="description"
          content="팀 정보를 수정하고 팀원과 함께 더 나은 협업을 시작하세요."
        />
        <meta property="og:title" content="팀 수정 - Coworkers" />
        <meta
          property="og:description"
          content="팀 이름, 프로필 이미지 등을 수정하여 팀을 더욱 효율적으로 관리하세요."
        />
        <meta
          property="og:url"
          content={`https://coworkers-colla.netlify.app/${group?.id}/editteam`}
        />
      </Head>
      <form
        className="mt-[12.5rem] flex flex-col items-center gap-20 
      tab:mt-[10rem] mob:mt-[8.25rem] mob:px-2"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-4xl tab:text-2xl">팀 수정하기</p>
        <div className="flex  flex-col  items-center gap-8 ">
          <div className="flex w-full flex-col">
            <ProfileInput
              image={watchImage}
              onImageChange={handleImageChange}
              error={!!errors.image}
            />
          </div>
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
            수정하기
          </Button>
          <p className="text-lg-regular mob:text-md-regular">
            팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
          </p>
        </div>
      </form>
    </>
  );
}
