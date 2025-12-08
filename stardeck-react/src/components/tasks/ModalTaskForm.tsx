import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import TaskForm from "@/components/tasks/TaskForm.tsx";
import useUiStore from "@/store/useUiStore.ts";
import {Button} from "@/components/ui/button.tsx";

export default function ModalTaskForm() {
    const isOpenModal = useUiStore(s => s.isTaskFormOpen);
    const closeModal = useUiStore(s => s.closeModal);

    function onOpenChange() {
        if(isOpenModal) closeModal();
    }

    return(
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