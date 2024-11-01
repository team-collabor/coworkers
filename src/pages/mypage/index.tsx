import {
  deleteUser,
  getUser,
  updateUserImageUrl,
  updateUserNickname,
  updateUserPassword,
  uploadUserImage,
} from '@/apis/users.api';
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
import { Modal } from '@/components/modal/index';
import {
  nicknameSchema,
  passwordConfirmationSchema,
  passwordSchema,
} from '@/constants/formSchemas/authSchema';
import { useAuthStore } from '@/store/useAuthStore';
import { GetUserResponse } from '@/types/dto/responses/users.response.types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

export default function MyPage() {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const [userData, setUserData] = useState<GetUserResponse | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser();
        const storedImageUrl = localStorage.getItem('userImage') || data.image;
        setUserData({ ...data, image: storedImageUrl });
        setNickname(data.nickname || '');
      } catch (error) {
        alert('로그인이 필요합니다');
        window.location.href = '/';
      }
    };
    fetchUserData();
  }, []);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadResponse = await uploadUserImage({ image: file });
      const imageUrl: string = uploadResponse.url;

      const updateResponse = await updateUserImageUrl({ image: imageUrl });
      const updatedMessage = updateResponse.message;

      setUserData((prevUserData) => ({
        ...prevUserData!,
        image: imageUrl,
      }));

      // 최신 URL을 localStorage에 저장
      localStorage.setItem('userImage', imageUrl);

      alert(updatedMessage);
    } catch (error) {
      alert('이미지 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleNicknameChange = async (event: React.FormEvent) => {
    event.preventDefault();
    // 닉네임 검증 로직 추가
    try {
      nicknameSchema.parse(nickname);

      await updateUserNickname({ nickname });
      setIsNicknameModalOpen(false);
      alert('닉네임이 성공적으로 변경되었습니다.');

      // Optionally refetch user data to show updated nickname
      const updatedUserData = await getUser();
      setUserData(updatedUserData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Zod에서 발생한 검증 오류를 사용자에게 보여줍니다.
        alert(error.errors.map((err) => err.message).join('\n'));
      } else {
        alert('닉네임 변경에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();

    // 비밀번호 검증 로직
    try {
      passwordSchema.parse(password);
      passwordConfirmationSchema.parse(confirmPassword);

      if (password !== confirmPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      await updateUserPassword({
        password,
        passwordConfirmation: confirmPassword,
      });
      setIsPasswordModalOpen(false);
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors.map((err) => err.message).join('\n'));
      } else if (error instanceof Error) {
        alert(
          error.message || '비밀번호 변경에 실패했습니다. 다시 시도해주세요.'
        );
      } else {
        alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const openModal = (modalType: string) => {
    if (modalType === 'nickname') setIsNicknameModalOpen(true);
    if (modalType === 'password') setIsPasswordModalOpen(true);
    if (modalType === 'withdrawal') setIsWithdrawalModalOpen(true);
  };

  const closeModal = (modalType: string) => {
    if (modalType === 'nickname') setIsNicknameModalOpen(false);
    if (modalType === 'password') setIsPasswordModalOpen(false);
    if (modalType === 'withdrawal') setIsWithdrawalModalOpen(false);
  };

  return (
    <div className="box-border flex w-screen justify-center overflow-x-hidden">
      <div className="mx-6 flex w-[49.5rem] flex-col pt-10">
        <p className="pb-6 text-xl font-bold leading-6">계정 설정</p>
        <div
          className="relative h-16 w-16 
        border-0 hover:cursor-pointer"
        >
          <Image
            src={userData?.image || '/icons/Member_xLarge.svg'}
            alt="MemberImage"
            fill
            className="cursor-pointer rounded-full object-cover 
            transition-opacity duration-300 hover:opacity-80"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
        <p className="mt-6 text-base font-bold">이름</p>
        <div
          className="mb-6 mt-3 flex h-12 items-center 
          justify-between rounded-xl border-[1px]
          border-primary bg-secondary px-4"
        >
          <p className="text-base">{userData?.nickname || '정보 없음'}</p>
          <Button
            buttonStyle={ButtonStyle.Box}
            buttonBackgroundColor={ButtonBackgroundColor.Green}
            buttonBorderColor={ButtonBorderColor.Green}
            buttonWidth={ButtonWidth.Fit}
            textColor={TextColor.White}
            textSize={TextSize.Small}
            buttonPadding={ButtonPadding.Small}
            className="h-8"
            type="button"
            onClick={() => openModal('nickname')}
          >
            변경하기
          </Button>
        </div>
        <p className="text-base font-bold">이메일</p>
        <div
          className="mb-6 mt-3 flex h-12 items-center 
          justify-between rounded-xl border-[1px]
          border-primary bg-tertiary px-4"
        >
          <p className="text-base">{userData?.email || '정보 없음'}</p>
        </div>
        <p className="text-base font-bold">비밀번호</p>
        <div
          className="mb-6 mt-3 flex h-12 items-center
          justify-between rounded-xl border-[1px]
          border-primary bg-tertiary px-4"
        >
          <p className="text-disabled blur-sm">●●●●●●●●●</p>
          <Button
            buttonStyle={ButtonStyle.Box}
            buttonBackgroundColor={ButtonBackgroundColor.Green}
            buttonBorderColor={ButtonBorderColor.Green}
            buttonWidth={ButtonWidth.Fit}
            textColor={TextColor.White}
            textSize={TextSize.Small}
            buttonPadding={ButtonPadding.Small}
            className="h-8"
            type="submit"
            onClick={() => openModal('password')}
          >
            변경하기
          </Button>
        </div>

        <div className="flex gap-2" onClick={() => openModal('withdrawal')}>
          <Image
            src="/icons/Subtract.svg"
            alt="Subtract"
            width={24}
            height={24}
            className="hover:cursor-pointer"
          />
          <div
            className="text-base font-bold text-status-danger
          hover:cursor-pointer"
          >
            회원 탈퇴하기
          </div>
        </div>

        <Modal open={isWithdrawalModalOpen}>
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header
                withIcon={
                  <Image
                    className="mb-4"
                    src="/icons/Alert.svg"
                    alt="Alert"
                    width={24}
                    height={24}
                  />
                }
              >
                <Modal.Title className="px-5 text-base">
                  회원탈퇴를 진행하시겠어요?
                </Modal.Title>
              </Modal.Header>
              <Modal.Summary className="px-5 text-sm">
                그룹장으로 있는 그룹은 자동으로 삭제되고,
                {'\n'}
                모든 그룹에서 나가집니다.
              </Modal.Summary>
              <div className="mt-6 flex justify-center gap-2">
                {/* 닫기 버튼 */}
                <Button
                  buttonStyle={ButtonStyle.Box}
                  buttonBackgroundColor={ButtonBackgroundColor.White}
                  buttonBorderColor={ButtonBorderColor.Gray}
                  buttonWidth={ButtonWidth.Full}
                  textColor={TextColor.Gray}
                  textSize={TextSize.Medium}
                  buttonPadding={ButtonPadding.Large}
                  type="button"
                  className="font-bold text-default"
                  onClick={() => closeModal('withdrawal')}
                >
                  닫기
                </Button>

                <Button
                  buttonStyle={ButtonStyle.Box}
                  buttonBackgroundColor={ButtonBackgroundColor.Red}
                  buttonBorderColor={ButtonBorderColor.None}
                  buttonWidth={ButtonWidth.Full}
                  textColor={TextColor.White}
                  textSize={TextSize.Medium}
                  buttonPadding={ButtonPadding.Large}
                  type="button"
                  className="font-bold"
                  onClick={async () => {
                    try {
                      await deleteUser(); // 탈퇴 API 호출
                      useAuthStore.getState().clearAuth(); // 인증 상태 초기화
                      window.location.href = '/'; // 홈 페이지로 리디렉션
                    } catch (error) {
                      alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
                    }
                  }}
                >
                  회원탈퇴
                </Button>
              </div>
            </Modal.Content>
          </Modal.Portal>
        </Modal>

        <Modal open={isPasswordModalOpen}>
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content className="font-pretendard text-sm font-bold">
              <Modal.Header>
                <Modal.Title className="mb-2">비밀번호 변경하기</Modal.Title>
              </Modal.Header>
              <Modal.Summary className="flex flex-col justify-start">
                <form
                  className="flex flex-col gap-4 text-left"
                  onSubmit={handlePasswordChange}
                  noValidate
                >
                  <Input
                    type="password"
                    id="password-input"
                    label="새 비밀번호"
                    placeholder="새 비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    id="password-check-input"
                    label="새 비밀번호 확인"
                    placeholder="새 비밀번호를 다시 한 번 입력해주세요."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <div className="flex justify-center gap-2">
                    <Button
                      buttonStyle={ButtonStyle.Box}
                      buttonBackgroundColor={ButtonBackgroundColor.White}
                      buttonBorderColor={ButtonBorderColor.Green}
                      buttonWidth={ButtonWidth.Full}
                      textColor={TextColor.Green}
                      textSize={TextSize.Small}
                      buttonPadding={ButtonPadding.Medium}
                      type="button"
                      onClick={() => closeModal('password')}
                      className="text-brand-primary"
                    >
                      닫기
                    </Button>

                    <Button
                      buttonStyle={ButtonStyle.Box}
                      buttonBackgroundColor={ButtonBackgroundColor.Green}
                      buttonBorderColor={ButtonBorderColor.Green}
                      buttonWidth={ButtonWidth.Full}
                      textColor={TextColor.White}
                      textSize={TextSize.Small}
                      buttonPadding={ButtonPadding.Medium}
                      type="submit"
                      className="text-white"
                    >
                      변경하기
                    </Button>
                  </div>
                </form>
              </Modal.Summary>
            </Modal.Content>
          </Modal.Portal>
        </Modal>

        <Modal open={isNicknameModalOpen}>
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content className="font-pretendard text-sm font-bold">
              <Modal.Header>
                <Modal.Title className="mb-2">이름 변경하기</Modal.Title>
              </Modal.Header>
              <Modal.Summary className="flex flex-col justify-start">
                <form
                  className="text-left"
                  onSubmit={handleNicknameChange}
                  noValidate
                >
                  <Input
                    type="text"
                    id="password-input"
                    label="새로운 이름"
                    placeholder="새 이름을 입력해주세요."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <div className="mt-6 flex justify-center gap-2">
                    <Button
                      buttonStyle={ButtonStyle.Box}
                      buttonBackgroundColor={ButtonBackgroundColor.White}
                      buttonBorderColor={ButtonBorderColor.Green}
                      buttonWidth={ButtonWidth.Full}
                      textColor={TextColor.Green}
                      textSize={TextSize.Small}
                      buttonPadding={ButtonPadding.Medium}
                      type="button"
                      onClick={() => closeModal('nickname')}
                      className="text-brand-primary"
                    >
                      닫기
                    </Button>
                    <Button
                      buttonStyle={ButtonStyle.Box}
                      buttonBackgroundColor={ButtonBackgroundColor.Green}
                      buttonBorderColor={ButtonBorderColor.Green}
                      buttonWidth={ButtonWidth.Full}
                      textColor={TextColor.White}
                      textSize={TextSize.Small}
                      buttonPadding={ButtonPadding.Medium}
                      type="submit"
                      className="text-white"
                    >
                      변경하기
                    </Button>
                  </div>
                </form>
              </Modal.Summary>
            </Modal.Content>
          </Modal.Portal>
        </Modal>
      </div>
    </div>
  );
}
