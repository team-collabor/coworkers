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

export function GroupDeleteModal({
  groupId,
  deleteGroup,
}: {
  groupId: number;
  deleteGroup: (id: number) => void;
}) {
  return (
    <Modal>
      <Modal.Toggle className="p-4 hover:bg-tertiary">삭제하기</Modal.Toggle>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content withToggle>
          <Modal.Header
            className="mb-5"
            withIcon={
              <UnoptimizedImage
                className="mb-4"
                src="/icons/Alert.svg"
                alt=""
                width={24}
                height={24}
              />
            }
          >
            <Modal.Title>그룹 삭제</Modal.Title>
            <Modal.Summary>해당 그룹을 삭제하시겠어요?</Modal.Summary>
          </Modal.Header>
          <Modal.Body>
            <div className="grid auto-cols-fr grid-flow-col gap-x-4">
              <Button
                onClick={() => deleteGroup(groupId)}
                buttonBackgroundColor={ButtonBackgroundColor.Red}
                buttonPadding={ButtonPadding.Large}
                buttonStyle={ButtonStyle.Box}
                buttonWidth={ButtonWidth.Full}
                buttonBorderColor={ButtonBorderColor.Gray}
                textColor={TextColor.Gray}
                textSize={TextSize.Large}
              >
                <p>삭제하기</p>
              </Button>
              <Modal.Close>
                <Button
                  buttonBackgroundColor={ButtonBackgroundColor.White}
                  buttonPadding={ButtonPadding.Large}
                  buttonStyle={ButtonStyle.Box}
                  buttonWidth={ButtonWidth.Full}
                  buttonBorderColor={ButtonBorderColor.Gray}
                  textColor={TextColor.Green}
                  textSize={TextSize.Large}
                >
                  <p className="text-default">취소하기</p>
                </Button>
              </Modal.Close>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}
