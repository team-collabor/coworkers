/* eslint-disable import/no-extraneous-dependencies */
import { TGetUser } from '@/apis/user/get-user';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '@/components/common/Button/Button';
import { Modal } from '@/components/modal';
import { UnoptimizedImage } from '@/components/next';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ProfileModal({ user }: { user?: TGetUser }) {
  return user ? (
    <Modal>
      <Modal.Toggle>
        <UnoptimizedImage
          className="cursor-pointer hover:scale-110"
          src="/icons/User_large.svg"
          alt=""
          width={24}
          height={24}
        />
      </Modal.Toggle>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content withToggle>
          <Modal.Header
            className="mb-6"
            withIcon={
              <UnoptimizedImage
                className="mb-6"
                src="/icons/Member.svg"
                alt=""
                width={46}
                height={46}
              />
            }
          >
            <Modal.Title>{user.nickname}</Modal.Title>
            <Modal.Summary>{user.email}</Modal.Summary>
          </Modal.Header>
          <Modal.Body className="flex justify-center">
            <CopyToClipboard text={user.email}>
              <Button
                textSize={TextSize.Large}
                textColor={TextColor.White}
                buttonBackgroundColor={ButtonBackgroundColor.Green}
                buttonStyle={ButtonStyle.Box}
                buttonBorderColor={ButtonBorderColor.Green}
                buttonPadding={ButtonPadding.Large}
                buttonWidth={ButtonWidth.Full}
                className="w-72"
              >
                이메일 복사하기
              </Button>
            </CopyToClipboard>
          </Modal.Body>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  ) : null;
}
