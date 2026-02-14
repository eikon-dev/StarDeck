import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/shadcn/february2026/dialog.tsx";
import {Button} from "@/shared/ui/shadcn/february2026/button.tsx";
import {TaskForm} from "@/features/task-create";
import useBottomPanelUiStore from "@/widgets/bottom-panel/model/useBottomPanelUiStore.ts";

/*
* TODO: Сделать рефакторинг
*  - Можно упростить компонент до features/task-create/ui/ModalTaskForm
*  - Убрать зависимости от uiStore и прокинуть пропсы
*  - onOpenChange() исправить
*  - Перевести на новый Shadcn/february2026
*/

export default function ModalTaskForm() {
  const isOpenModal = useBottomPanelUiStore(s => s.isTaskFormOpen);
  const closeModal = useBottomPanelUiStore(s => s.closeModal);

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

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>

          <Button
            type='submit'
            form="create-form"
          >Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}