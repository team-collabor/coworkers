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
import { TUser } from '@/types/user';

export default function ProfileModal({ user }: { user?: TUser }) {
  return (
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
            <Modal.Title>{user?.nickname}</Modal.Title>
            <Modal.Summary>{user?.email}</Modal.Summary>
          </Modal.Header>
          <Modal.Body className="flex justify-center">
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
          </Modal.Body>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}
