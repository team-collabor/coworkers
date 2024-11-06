import { PlusIcon } from 'lucide-react';
import IconAndText from '../common/IconAndText';
import { Modal } from '../modal';
import AddTaskForm from './AddTaskForm';

function AddTaskModal() {
  return (
    <Modal>
      <Modal.Trigger>
        <IconAndText
          icon={<PlusIcon className="size-4" />}
          text="할 일 추가"
          wrapperClassName="text-lg-semibold text-primary"
        />
      </Modal.Trigger>
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
          </Modal.Body>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
}

export default AddTaskModal;
