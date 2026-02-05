import {useTasksStore} from "@/entities/task";

export function removeTask(id: string) {
    useTasksStore.getState().removeTask(id);
}