import useTasksStore from "../store/useTasksStore.ts";
import selectorTasksSort from "../selectors/selectorTasksSort.ts";

export default function useSortedTasks() {
    const tasks = useTasksStore(s => s.tasks);
    const emptyTasks = tasks.length === 0;
    const {daily, long} = selectorTasksSort(tasks);

    return {
        emptyTasks,
        daily,
        long
    };
}