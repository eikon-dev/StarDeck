import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/shadcn/february2026/dialog";
import {Button} from "@/shared/ui/shadcn/february2026/button";
import {EditTaskForm} from "@/features/task-edit/ui/EditTaskForm";

type Props = {
  id: string | null,
  isOpenModal: boolean,
  closeModal: () => void,
}

export function ModalEditTaskForm({id, closeModal, isOpenModal}: Props) {
  if (!id) return null;
  return (
    <Dialog open={isOpenModal} onOpenChange={closeModal}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Редактирование задачи
          </DialogTitle>

          <DialogDescription>
            Здесь вы можете отредактировать задачу
          </DialogDescription>
        </DialogHeader>

        <EditTaskForm
          id={id}
          onSuccess={closeModal}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>

          <Button
            type="submit"
            form="edit-form"
            variant="default"
          >
            Сохранить
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}