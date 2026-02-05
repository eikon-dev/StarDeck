import {type Task} from "@/entities/task";
import TaskItem from "@/entities/task/ui/TaskItem";

type Props = {
    tasks: {
        emptyTasks: boolean,
        daily: Task[],
        long: Task[],
    }
    onToggleTask: (id: string) => void,
    onRemoveTask: (id: string) => void,
}

export default function TaskListView({tasks, onToggleTask, onRemoveTask}: Props) {
    //TODO: Убрать emptyTasks?
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
                            onToggle={onToggleTask}
                            onDelete={onRemoveTask}
                        />)
                }</div>
            </section>
            <section>
                <div className='flex flex-col gap-2'>{
                    long.map(
                        t => <TaskItem
                            key={t.id}
                            task={t}
                            onToggle={onToggleTask}
                            onDelete={onRemoveTask}
                        />)
                }</div>
            </section>
        </div>
    );
}