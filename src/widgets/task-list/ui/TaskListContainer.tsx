import {toggleTask} from "@/features/task-toggle";
import {removeTask} from "@/features/task-remove";
import {useSortedTasks} from "@/entities/task";
import TaskListView from "@/widgets/task-list/ui/TaskListView";
import useBottomPanelUiStore from "@/widgets/bottom-panel/model/useBottomPanelUiStore";
import {useState} from "react";
import {ModalEditTaskForm} from "@/features/task-edit";

export default function TaskListContainer() {
  const tasks = useSortedTasks();

  const openEditModal = useBottomPanelUiStore(s => s.openEditModal);
  const closeEditModal = useBottomPanelUiStore(s => s.closeEditModal);
  const isEditTaskFormOpen = useBottomPanelUiStore(s => s.isEditTaskFormOpen)

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  function onEditTask(id: string) {
    setEditingTaskId(id);
    openEditModal();
  }

  function onCloseEditModal() {
    closeEditModal();
    setEditingTaskId(null);
  }

  return (
    <>
      <TaskListView
        tasks={tasks}
        onToggleTask={toggleTask}
        onRemoveTask={removeTask}
        onEditTask={onEditTask}
      />

      <ModalEditTaskForm
        id={editingTaskId}
        isOpenModal={isEditTaskFormOpen}
        closeModal={onCloseEditModal}
      />
    </>
  );
}