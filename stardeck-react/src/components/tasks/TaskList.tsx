import TaskItem from "./TaskItem.tsx";
import useSortedTasks from "../../hooks/useSortedTasks.ts";

export default function TaskList() {
    const {daily, long, emptyTasks} = useSortedTasks();

    if (emptyTasks) return (
        <h1 className='flex flex-col items-center'>Пока что тут пусто T_T</h1>
    )

    return(
        <div className='grid grid-cols-2 gap-2'>
            <section >
                <div className='flex flex-col gap-2'>{daily.map(t => <TaskItem key={t.id} task={t} />)}</div>
            </section>
            <section >
                <div className='flex flex-col gap-2'>{long.map(t => <TaskItem key={t.id} task={t} />)}</div>
            </section>
        </div>
    );
}