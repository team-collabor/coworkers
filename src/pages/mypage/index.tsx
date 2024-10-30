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
import Image from 'next/image';
import { useState } from 'react';

export default function MyPage() {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const openModal = (modalType: string) => {
    if (modalType === 'nickname') setIsNicknameModalOpen(true);
    if (modalType === 'email') setIsEmailModalOpen(true);
    if (modalType === 'password') setIsPasswordModalOpen(true);
    if (modalType === 'withdrawal') setIsWithdrawalModalOpen(true);
  };

  const closeModal = (modalType: string) => {
    if (modalType === 'nickname') setIsNicknameModalOpen(false);
    if (modalType === 'email') setIsEmailModalOpen(false);
    if (modalType === 'password') setIsPasswordModalOpen(false);
    if (modalType === 'withdrawal') setIsWithdrawalModalOpen(false);
  };

  return (
    <div className="box-border flex w-screen justify-center overflow-x-hidden">
      <div className="mx-6 flex w-[49.5rem] flex-col pt-10">
        <p className="pb-6 text-xl font-bold leading-6">계정 설정</p>
        <div className="relative h-16 w-16 hover:cursor-pointer">
          <Image
            src="/icons/Member_xLarge.svg"
            alt="Member"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <p className="mt-6 text-base font-bold">이름</p>
        <div
          className="mb-6 mt-3 flex h-12 items-center 
          justify-between rounded-xl border-[1px]
          border-primary bg-secondary px-4"
        >
          <p className="text-base">정보 없음</p>
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
          <p className="text-disabled">정보 없음</p>
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
            onClick={() => openModal('email')}
          >
            변경하기
          </Button>
        </div>
        <p className="text-base font-bold">비밀번호</p>
        <div
          className="mb-6 mt-3 flex h-12 items-center
          justify-between rounded-xl border-[1px]
          border-primary bg-tertiary px-4"
        >
          <p className="text-disabled">●●●●●●●●●</p>
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
                <form className="flex flex-col gap-4 text-left" noValidate>
                  <Input
                    type="password"
                    id="password-input"
                    label="새 비밀번호"
                    placeholder="새 비밀번호를 입력해주세요."
                  />
                  <Input
                    type="password"
                    id="password-check-input"
                    label="새 비밀번호 확인"
                    placeholder="새 비밀번호를 다시 한 번 입력해주세요."
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

        <Modal open={isEmailModalOpen}>
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content className="font-pretendard text-sm font-bold">
              <Modal.Header>
                <Modal.Title className="mb-2">이메일 변경하기</Modal.Title>
              </Modal.Header>
              <Modal.Summary className="flex flex-col justify-start">
                <form className="text-left" noValidate>
                  <Input
                    type="email"
                    id="password-input"
                    label="새로운 이메일"
                    placeholder="새 이메일을 입력해주세요."
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
                      onClick={() => closeModal('email')}
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
                <form className="text-left" noValidate>
                  <Input
                    type="text"
                    id="password-input"
                    label="새로운 이름"
                    placeholder="새 이름을 입력해주세요."
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
