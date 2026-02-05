import { useTasksStore, selectTasksSort} from '@/entities/task';

export function useSortedTasks() {
    const tasks = useTasksStore(s => s.tasks);
    const emptyTasks = tasks.length === 0;
    const {daily, long} = selectTasksSort(tasks);

    return {
        emptyTasks,
        daily,
        long
    };
}