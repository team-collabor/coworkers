import { Task } from '@/types/tasks.types';
import { DrawerDialog } from '../../common/DrawerDialog';
import TaskDetailContent from './TaskDetailContent';

type TaskDetailModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
  task: Task | null;
};

export default function TaskDetailModal({
  open,
  setOpen,
  trigger,
  task,
}: TaskDetailModalProps) {
  return (
    <DrawerDialog open={open} setOpen={setOpen} trigger={trigger}>
      {task && <TaskDetailContent task={task} />}
    </DrawerDialog>
  );
}
