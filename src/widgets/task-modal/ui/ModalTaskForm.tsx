import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog.tsx";
import {TaskForm} from "@/features/task-create";
import useBottomPanelUiStore from "@/widgets/bottom-panel/modal/useBottomPanelUiStore.ts";
import {Button} from "@/shared/ui/button.tsx";

export default function ModalTaskForm() {
  const isOpenModal = useBottomPanelUiStore(s => s.isTaskFormOpen);
  const closeModal = useBottomPanelUiStore(s => s.closeModal);

  //TODO: Тут пахнет проблемой
  function onOpenChange() {
    if (isOpenModal) closeModal();
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Создай задачу
          </DialogTitle>
          <DialogDescription>
            Сделай шаг к звезде
          </DialogDescription>
        </DialogHeader>
        <TaskForm onSuccess={closeModal}/>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}