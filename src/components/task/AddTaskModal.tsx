import { cn } from '@/utils/tailwind/cn';
import { PlusIcon } from 'lucide-react';
import Button, {
  ButtonBackgroundColor,
  ButtonBorderColor,
  ButtonPadding,
  ButtonStyle,
  ButtonWidth,
  TextColor,
  TextSize,
} from '../common/Button/Button';
import IconAndText from '../common/IconAndText';
import { Modal } from '../modal';
import AddTaskForm from './AddTaskForm';

function AddTaskModal() {
  return (
    <Modal>
      <Modal.Toggle className="">
        <Button
          className={cn(
            'fixed bottom-[5vh] right-[10vw]',
            'tab:bottom-7 tab:right-10',
            'mob:bottom-[1.44rem] mob:right-7'
          )}
          buttonStyle={ButtonStyle.Floating}
          buttonWidth={ButtonWidth.Fit}
          buttonPadding={ButtonPadding.Large}
          buttonBackgroundColor={ButtonBackgroundColor.Green}
          textColor={TextColor.White}
          textSize={TextSize.Large}
          buttonBorderColor={ButtonBorderColor.None}
        >
          <IconAndText
            icon={<PlusIcon className="size-4" />}
            text="할 일 추가"
            wrapperClassName="text-lg-semibold text-primary"
          />
        </Button>
      </Modal.Toggle>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content withToggle>
          <Modal.Header>
            <Modal.Title>할 일 만들기</Modal.Title>
            <Modal.Summary className="text-md-medium text-default">
              할 일은 실제로 행동 가능한 작업 중심으로
              {'\n'}
              작성해주시면 좋습니다.
            </Modal.Summary>
          </Modal.Header>
          <Modal.Body>
            <AddTaskForm />
            <Modal.Close>
              <Button
                buttonStyle={ButtonStyle.Box}
                buttonWidth={ButtonWidth.Full}
                buttonPadding={ButtonPadding.Large}
                buttonBackgroundColor={ButtonBackgroundColor.Green}
                textColor={TextColor.White}
                textSize={TextSize.Large}
                buttonBorderColor={ButtonBorderColor.None}
              >
                만들기
              </Button>
            </Modal.Close>
          </Modal.Body>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}

export default AddTaskModal;
