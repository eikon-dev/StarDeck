import {type Task} from "@/entities/task";
import TaskItem from "@/entities/task/ui/TaskItem";

type Props = {
    tasks: {
        emptyTasks: boolean,
        daily: Task[],
        long: Task[],
    }
    toggleTask: (id: string) => void,
    removeTask: (id: string) => void,
}

export default function TaskList({tasks, toggleTask, removeTask}: Props) {
    const {daily, long, emptyTasks} = tasks;

    if (emptyTasks) return (
        <h1 className='flex flex-col items-center'>Пока что тут пусто...</h1>
    )

    return (
        <div className='grid grid-cols-2 gap-2'>
            <section>
                <div className='flex flex-col gap-2'>{
                    daily.map(
                        t => <TaskItem
                            key={t.id}
                            task={t}
                            onToggle={toggleTask}
                            onDelete={removeTask}
                        />)
                }</div>
            </section>
            <section>
                <div className='flex flex-col gap-2'>{
                    long.map(
                        t => <TaskItem
                            key={t.id}
                            task={t}
                            onToggle={toggleTask}
                            onDelete={removeTask}
                        />)
                }</div>
            </section>
        </div>
    );
}