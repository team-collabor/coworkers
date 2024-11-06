import { useDeleteTask } from '@/queries/tasks.queries';
import { useTaskStore } from '@/store/useTaskStore';
import { Button } from '../common/Button/ShadcnButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../common/Dialog';

function DeleteTaskModal() {
  const {
    selectedTaskList,
    setIsTaskUpdateFormShow,
    isTaskDeleteDialogOpen,
    setIsTaskDeleteDialogOpen,
    selectedDate,
    selectedTask,
    setSelectedTask,
  } = useTaskStore();
  const { mutate: deleteTask } = useDeleteTask();

  const handleClickDeleteConfirm = () => {
    deleteTask({
      groupId: selectedTaskList?.groupId ?? -1,
      taskListId: selectedTaskList?.id ?? -1,
      taskId: selectedTask?.id ?? -1,
      date: selectedDate.toLocaleDateString('ko-KR'),
    });
    setSelectedTask(null);
    setIsTaskDeleteDialogOpen(false);
    setIsTaskUpdateFormShow(false);
  };

  return (
    <Dialog
      open={isTaskDeleteDialogOpen}
      onOpenChange={setIsTaskDeleteDialogOpen}
    >
      <DialogContent className="w-80">
        <DialogHeader>
          <DialogTitle>할 일을 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            삭제된 할 일은 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setIsTaskDeleteDialogOpen(false)}
          >
            취소
          </Button>
          <Button variant="destructive" onClick={handleClickDeleteConfirm}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTaskModal;
